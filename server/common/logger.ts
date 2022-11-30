import pino from 'pino';

const l = pino({
  // name: process.env.APP_ID,
  name: 'Interview challenge',
  // level: process.env.LOG_LEVEL,
  level: 'debug',
});

export default l;
