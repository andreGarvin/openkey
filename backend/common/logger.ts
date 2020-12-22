import * as winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
  level: process.env.ENV === 'dev' ? 'debug' : 'info',
  defaultMeta: {
    service: process.env.APP_NAME,
  },
});

if (process.env.ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
