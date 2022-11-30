import MainService from '../services/main.service';
import HelperService from '../services/helper.service';
import { Request, Response } from 'express';
import l from '../../common/logger';
import { IHandlerValidateIPRequest, IUtilsHTTPError } from '../services/interface';

export class Controller {

  root(req: Request, res: Response): void {
    l.info(`controller => function root()`);
    MainService.root().then(
      (result) => res.status(200).json(result)
    );
  }

  getPrometheusMetrics(req: Request, res: Response): void {
    l.info(`controller => function getPrometheusMetrics()`);
    MainService.getPrometheusMetrics().then(
      (result) => res.status(200).json({ metrics: result })
    );
  }

  checkHealth(req: Request, res: Response): void {
    l.info(`controller => function checkHealth()`);
    res.status(200).json({ message: "Application is still alive." })
  }

  validateIPv4(req: Request, res: Response): void {
    const request: IHandlerValidateIPRequest = { ip: req.body.ip };
    l.info(`controller => function validate() received parameter ip "${request.ip}"`);

    MainService.validateIPv4(request).then(
      (value) => {
        // Response json data with 200 OK (promise resolved).
        res.status(200).json(value);
      },
      (reason) => {
        // Response with 400 Bad Request if the request body contains a non-ip string (promise rejected).
        res.status(400).json(reason.message);
      }
    );

    return;
  }

  getQueryHistory(req: Request, res: Response): void {
    l.info(`controller => function getQueryHistory()`);
    MainService.getQueryHistory().then(
      (result) => {
        // Response json data with 200 OK (promise resolved).
        res.status(200).json(result);
      },
      (reason) => {
        // Response with 400 Bad Request if there is no data in the database yet.
        res.status(400).json(reason.message);
      }
    );

    return;
  }

  lookupDomain(req: Request, res: Response): void {
    const domainName = req.query['domain'] as string;
    const ip = req.ip;
    l.info(`controller => function lookupDomain() received parameter "${domainName}" from ip "${ip}"`);
    const isValidDomainName = HelperService.isValidDomainName(domainName);

    // Response with 400 Bad Request and early return if the queried domain name isn't valid.
    if (!isValidDomainName) {
      const err: IUtilsHTTPError = { message: "Not a valid domain name" };
      res.status(400).json(err);
      return;
    }

    MainService.lookupDomain(domainName, ip)
      .then((result) => {
        res.status(200).json(result); // Response json data with 200 OK if found IPv4 address.
        return;
      })
      .catch((err) => {
        l.error(err)
        const errObj: IUtilsHTTPError = { message: "Can not resolve any IPv4 address" };
        res.status(404).json(errObj); // Response with 404 Not Found if no IPv4 address was found.
        return;
      })

  }

}

export default new Controller;