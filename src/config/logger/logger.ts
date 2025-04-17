import { createLogger, format, transports } from 'winston';

const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message }) => {
    return `[${level.toUpperCase()}] [${timestamp}] ${message}`;
  })
);

const logger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.Console({ level: 'debug', format: logFormat }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log', level: 'info' }),
  ],
});

export default logger;
