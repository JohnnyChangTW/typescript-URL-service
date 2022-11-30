import express from 'express';
import controller from './controller';
export default express
  .Router()
  .get('/', controller.root)
  .get('/metrics', controller.getPrometheusMetrics)
  .get('/health', controller.checkHealth)
  .get('/history', controller.getQueryHistory)
  .get('/tools/lookup', controller.lookupDomain)
  .post('/tools/validate', controller.validateIPv4);

