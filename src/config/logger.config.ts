import { createLogger, format, transports, Logger } from 'winston';
import { TransformableInfo } from 'logform'; // logform은 winston 내부 포맷 타입

const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf((info: TransformableInfo) => {
    const { timestamp, level, message } = info;
    const msg = typeof message === 'string' ? message : JSON.stringify(message, null, 2);
    return `[${level.toUpperCase()}] [${timestamp}] ${msg}`;
  })
);

const logger: Logger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.Console({ level: 'debug', format: logFormat }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log', level: 'info' }),
  ],
});

export default logger;
