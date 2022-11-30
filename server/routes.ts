import { Application } from 'express';
import router from './api/controllers/router';
export default function routes(app: Application): void {
  /**
   * As our project grows larger, we can set more routes/routers/directories for spearating different functionalities.
   * In this project, for simplicity we collect all the endpoints in /server/api/controllers/router.
   */
  app.use('/v1', router);
} 