import * as dotenv from 'dotenv';

// importing .env variables
dotenv.config();

const checkStrVar = (variable: string | undefined, name: string): string => {
  if (!variable) throw new Error(`undefined variable: ${name}`);
  return variable;
};

const API_VERSION = 'v1';
const API_PORT = process.env.ESEAL_API_PORT
  ? +process.env.ESEAL_API_PORT
  : 3001;

const ESEAL_BASE_PATH = {
  EIDAS_BRIDGE: `/eseal/${API_VERSION}`,
};

const API_NAME = 'ESEAL API';

const EIDAS_BRIDGE_ENDPOINTS = {
  SIGNATURE_CREATION: '/signatures',
};

const ESEAL_SERVICE = {
  NAME: API_NAME,
  PORT: API_PORT,
  BASE_PATH: ESEAL_BASE_PATH,
  ENDPOINTS: EIDAS_BRIDGE_ENDPOINTS,
};

const MAX_REQUEST_BODY_SIZE = '10mb';
const REQUEST_SERVICE_TIMEOUT = 15000; // in milliseconds

const DSS_REST_SERVICES = `/services/rest`;
const DSS_ENDPOINT = 'https://ec.europa.eu/digital-building-blocks/DSS/webapp-demo';
const DSS_URL = {
  ORIGINAL_DOCUMENTS: `${DSS_ENDPOINT}${DSS_REST_SERVICES}/validation/getOriginalDocuments`,
};

const CERTIFICATE = checkStrVar(
  process.env.CERTIFICATE,
  "CERTIFICATE"
);


export {
  API_NAME,
  DSS_URL,
  ESEAL_SERVICE,
  MAX_REQUEST_BODY_SIZE,
  REQUEST_SERVICE_TIMEOUT,
  CERTIFICATE,
};
