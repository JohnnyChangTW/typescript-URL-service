# interview-assignment

Stakefish interview assignment


## Quick Start

```shell
docker-compose up -d --build
```

Note: It may take a few seconds (for the application to start running) before we can start sending request.


## About this project
1. This project uses [`express-no-stress-typescript`](https://github.com/cdimascio/generator-express-no-stress-typescript) as the basic scaffold with some minor modifications.
2. `express-no-stress-typescript` uses [express-openapi-validator](https://github.com/cdimascio/express-openapi-validator) to automatically handle all API validation based on what you've defined in the spec.
3. There are two key files:
`server/routes.ts` - This references the implementation of all of the routes.
`server/common/api.yaml` - This file contains the [OpenAPI spec](https://swagger.io/specification/).


## Discussion

### API endpoints

In the given problem-main folder, since the swagger.yaml line 1 indicates "basePath: /v1",
all API endpoints mentioned in the original README.MD(in this project is /README-problem.md) is prefixed with /v1.
That is:

- http://serverURL/v1/ (root)
- http://serverURL/v1/metrics
- http://serverURL/v1/health
- http://serverURL/v1/tools/lookup
- http://serverURL/v1/tools/validate
- http://serverURL/v1/history

Further modificatoin is needed if the following API endpoints format is desired:

- http://serverURL/ (root)
- http://serverURL/metrics
- http://serverURL/health
- http://serverURL/v1/tools/lookup
- http://serverURL/v1/tools/validate
- http://serverURL/v1/history

### Version

The desired version in the given swagger.yaml line 40 is "version": "1.0".
However, in /package.json line 3, version is set to  "1.0.0" so as to avoid errors, match semantic versioning and match the desired output of the `/` (root) endpoint.

### Interface naming

The desired nameing in the given swagger.yaml is, for example, handler.ValidateIPRequest.
However, to name the interfaces properly, this project uses IHandlerValidateIPRequest as the interface name to regulate data format.


### Harcoded secrets

For simplicity, this project hardcoded all secrets and configurations, which in production we shoud use things like .env/K8S configmap/K8S secrets/AWS Secrets Manager to manage.

### Datebase selection

For convenience I chose MySQL as the database.
However For this project, it seems that we can use mongoDB or other NoSQL database for storing data, since there are no relation between the data.



## Some possible improvements

- Check if all the dependencies are necessary and/or safe/efficient to use.
- Separate routes for differeny functionality
- Enhance the project much more by SOLID principle.
- Automate the api.yaml definitiion, in stead of typing by hand.
- Better error handling.



