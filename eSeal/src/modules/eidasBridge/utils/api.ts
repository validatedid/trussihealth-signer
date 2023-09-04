import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { REQUEST_SERVICE_TIMEOUT } from '../../../config';
import * as printer from './printer';

async function post(
  data: unknown,
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<unknown>> {
  printer.PRINT_SILLY(`POST: ${url}`);
  printer.PRINT_SILLY(printer.inspect(data));
  try {
    const response = await axios.post(url, data, {
      timeout: REQUEST_SERVICE_TIMEOUT,
      ...config,
    });
    printer.PRINT_SILLY('AXIOS POST RESPONSE: ');
    printer.PRINT_SILLY(response.data);
    return response;
  } catch (error) {
    printer.PRINT_ERROR(error as Error);
    throw error;
  }
}

async function postEncoded(
  data: unknown,
  url: string,
): Promise<AxiosResponse<unknown>> {
  printer.PRINT_SILLY(`POST: ${url}`);
  printer.PRINT_SILLY(data as JSON);
  try {
    const response = await axios.post(url, qs.stringify(data), {
      timeout: REQUEST_SERVICE_TIMEOUT,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    printer.PRINT_SILLY('AXIOS POST RESPONSE: ');
    printer.PRINT_SILLY(response.data);
    return response;
  } catch (error) {
    printer.PRINT_ERROR(error as Error);
    throw error;
  }
}

async function put(
  data: unknown,
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<unknown>> {
  printer.PRINT_SILLY(`PUT: ${url}`);
  printer.PRINT_SILLY(printer.inspect(data));
  try {
    const response = await axios.put(url, data, {
      timeout: REQUEST_SERVICE_TIMEOUT,
      ...config,
    });
    printer.PRINT_SILLY('AXIOS PUT RESPONSE: ');
    printer.PRINT_SILLY(response.data);
    return response;
  } catch (error) {
    printer.PRINT_ERROR(error as Error);
    throw error;
  }
}

async function get(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<unknown>> {
  printer.PRINT_SILLY(`GET: ${url}`);
  try {
    const response = await axios.get(url, {
      timeout: REQUEST_SERVICE_TIMEOUT,
      ...config,
    });
    printer.PRINT_SILLY('AXIOS GET RESPONSE: ');
    printer.PRINT_SILLY(response.data);
    return response;
  } catch (error) {
    printer.PRINT_ERROR(error as Error);
    throw error;
  }
}

async function getData(
  url: string,
  config?: AxiosRequestConfig,
): Promise<unknown> {
  const response = await get(url, {
    timeout: REQUEST_SERVICE_TIMEOUT,
    ...config,
  });
  return response.data;
}

async function postWithToken(
  token: string,
  data: unknown,
  url: string,
): Promise<AxiosResponse<unknown>> {
  const response = await post(data, url, {
    timeout: REQUEST_SERVICE_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

async function getWithToken(
  token: string,
  url: string,
): Promise<AxiosResponse<unknown>> {
  const response = await get(url, {
    timeout: REQUEST_SERVICE_TIMEOUT,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

async function deleteElem(url: string): Promise<void> {
  printer.PRINT_SILLY(`DELETE: ${url}`);
  try {
    const response = await axios.delete(url, {
      timeout: REQUEST_SERVICE_TIMEOUT,
    });
    printer.PRINT_SILLY('AXIOS DELETE RESPONSE: ');
    printer.PRINT_SILLY(`${response.status}`);
    printer.PRINT_SILLY(response.statusText);
  } catch (error) {
    printer.PRINT_ERROR(error as Error);
    throw error;
  }
}

export {
  post,
  postEncoded,
  put,
  get,
  getData,
  postWithToken,
  getWithToken,
  deleteElem,
};
