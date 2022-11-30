import './common/env';
import Server from './common/server';
import routes from './routes';
import { myDataSource } from './api/services/data-source.service';
import l from './common/logger';

myDataSource
  .initialize()
  .then(() => {
    l.info("Data Source has been initialized!");
  })
  .catch((err) => {
    l.error("Error during Data Source initialization:");
    l.error(err);
  });

// const port = parseInt(process.env.PORT ?? '3000');
const port = parseInt('3000');



export default new Server().router(routes).listen(port);
