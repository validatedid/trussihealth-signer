import * as util from 'util';
import { AxiosError } from 'axios';
import HTTPError from '../exceptions/HTTPError';
import LOGGER from '../../../logger';

// const ACCEPTABLE_ERROR_TRESHOLD = 0.15;
// const DATE_START_SPECIAL_COVID_RULE = "3/14/2020";
// const DATE_END_SPECIAL_COVID_RULE = "3/13/2021";
// const YEAR_MS = 1000 * 60 * 60 * 24 * 365;

const inspect = (data: unknown): string => {
  return util.inspect(data);
};

const PRINT = (data: string, level: string, operation?: string): void => {

  LOGGER.log({
    message: data,
    level,
    operation,
  });
};

const PRINT_INFO = (data: string, operation?: string): void => {
  PRINT(util.inspect(data), 'info', operation);
};

const PRINT_DEBUG = (data: string, operation?: string): void => {
  PRINT(util.inspect(data), 'debug', operation);
};

const PRINT_ERROR = (
  error: Error | HTTPError | AxiosError,
  operation?: string,
): void => {

  // check if it is an VIDCHAIN error
  if ((error as Error).name === 'HTTPError') {
    const customError = error as HTTPError;
    LOGGER.error(customError.Title, 'error', operation);
    LOGGER.error(customError.Status.toString(), 'error', operation);
    LOGGER.error(customError.Detail, 'error', operation);
  } else {
    const customError = error as Error;
    LOGGER.error(customError.message, 'error', operation);
    LOGGER.error(customError.name, 'error', operation);
    if (customError.stack) LOGGER.error(customError.stack, 'error', operation);
  }
  if ((error as AxiosError).response) {
    const { response } = error as AxiosError;
    LOGGER.error(util.inspect(response.data));
  }
};

const PRINT_SILLY = (data: string | JSON, operation?: string): void => {
  let toPrint = data;
  if (typeof toPrint !== 'string') toPrint = util.inspect(data);
  PRINT(`\n${toPrint}`, 'silly', operation);
};

export { inspect, PRINT_INFO, PRINT_DEBUG, PRINT_ERROR, PRINT_SILLY };
