import l from '../../common/logger';
import { IHandlerValidateIPRequest, IHandlerValidateIPResponse, IModelRoot, IModelAddress, IModelQuery, IUtilsHTTPError } from './interface';
import dns from 'dns';
import HelperService from './helper.service';
import { myDataSource } from './data-source.service';
import { QueryEntity } from '../entities/query.entity';
import * as pjson from '../../../package.json'
import os from 'os';
import client from 'prom-client';

export class MainService {

  async root(): Promise<IModelRoot> {
    return Promise.resolve({
      version: pjson.version,
      date: Math.round((Date.now() / 1000)),
      kubernetes: os.hostname() === "JohnnydeMBP.hitronhub.home" ? false : true
    });
  }

  async getPrometheusMetrics(): Promise<string> {
    const collectDefaultMetrics = client.collectDefaultMetrics;
    const Registry = client.Registry;
    const register = new Registry();
    collectDefaultMetrics({ register });
    const result = await register.metrics();
    l.info("result");
    l.info(result);
    return result;
  }

  async lookupDomain(domain: string, client_ip: string): Promise<IModelQuery> {
    const query: IModelQuery = {
      addresses: [],
      client_ip,
      created_at: Date.now(),
      domain
    }
    const options = {
      family: 4, // Extract IPv4 address
      all: true, // Extract all (of the IPv4 addresses, not only the first one)
    };

    return new Promise((resolve, reject) => {
      dns.lookup(domain, options, async (err, addresses) => {
        if (err) {
          reject(err);
        }
        else if (addresses) {
          l.info("addresses");
          l.info(addresses);
          // Update the lookup result into query object for sending back to controller.
          for (const element of addresses) {
            query.addresses.push(element['address']);
          }
          // Store the query information into database
          await myDataSource.getRepository(QueryEntity).save({
            addresses: query.addresses,
            client_ip: query.client_ip,
            domain: query.domain,
          });
          resolve(query);
        }
        else {
          reject(new Error('Unhandled error type.'))
        }
      });
    });

  }

  async validateIPv4(request: IHandlerValidateIPRequest): Promise<IHandlerValidateIPResponse> {

    return new Promise((resolve, reject) => {
      if (HelperService.isIPv4(request.ip) == true) {
        const validateResult: IHandlerValidateIPResponse = { status: true };
        resolve(validateResult);
      }
      else if (HelperService.isIPv6(request.ip) == true) {
        const validateResult: IHandlerValidateIPResponse = { status: false };
        resolve(validateResult);
      }
      else {
        const err: IUtilsHTTPError = { message: 'Not an ip string.' };
        reject(err);
      }
    });

  }

  async getQueryHistory(): Promise<IModelQuery[]> {

    return new Promise(async (resolve, reject) => {
      // Read the latest 20 records in descending order from database.
      const queryEntities = await myDataSource.getRepository(QueryEntity).find({
        order: {
          createdAt: "DESC",
        },
        take: 20
      })
      if (queryEntities.length === 0) {
        reject(new Error("There is no query record yet. Please lookup first."));
      }
      else if (queryEntities.length !== 0) {
        // In order to match yaml definition: remove propertiy 'id' and 'updateAt' in the queryEntities, rename 'createdAt' to 'created_at', parse 'created_at' from Date format to integer format(in seconds).
        const queryHistory = queryEntities.map(
          ({ id, updatedAt, createdAt, ...keepAttrs }) => ({ ...keepAttrs, created_at: Date.parse(createdAt) / 1000 })
        );
        l.info("queryHistory: ");
        l.info(queryHistory);
        resolve(queryHistory);
      }
    });
  }

}

export default new MainService