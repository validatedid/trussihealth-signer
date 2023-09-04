import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { TransformableInfo } from 'logform';
import * as fs from 'fs';
import {API_NAME, ESEAL_SERVICE} from "./config";

const logDir = 'log';
interface InfoPrint extends TransformableInfo {
  timestamp: string;
}

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyRotateInfoFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%-results.log`,
  datePattern: 'YYYY-MM-DD',
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
      (info) =>
        `${(info as InfoPrint).timestamp} ${info.level} [${ESEAL_SERVICE.NAME}]: ${
          info.message
        }`,
    ),
  ),
});

const dailyRotateErrorFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%-error.log`,
  datePattern: 'YYYY-MM-DD',
  level: 'error',
});

const LOGGER = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
      (info) =>
        `${(info as InfoPrint).timestamp} ${info.level} [${API_NAME}]: ${
          info.message
        }`,
    ),
  ),
  transports: [
    new transports.Console({
      // change level if in dev environment versus production
      level: 'info',
    }),
    dailyRotateInfoFileTransport,
    dailyRotateErrorFileTransport,
  ],
  // If false, handled exceptions will not cause process.exit
  exitOnError: false,
});

export default LOGGER;
