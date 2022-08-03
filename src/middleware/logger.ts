import winston from 'winston';

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = format;

const timezoned = () => {
  return new Date().toLocaleString('af-ZA');
};

const loggerFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp({
      format: timezoned,
    }),
    loggerFormat,
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.colorize(),
    }),
  );
}

export { logger };
