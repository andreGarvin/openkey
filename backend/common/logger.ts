import * as winston from 'winston';

const logger = winston.createLogger({
  exitOnError: false,
  format: winston.format.combine(
    winston.format.errors({
      stack: true,
    }),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
  level: process.env.ENV === 'dev' ? 'debug' : 'info',
  defaultMeta: {
    service: process.env.APP_NAME,
  },
});

export default logger;
