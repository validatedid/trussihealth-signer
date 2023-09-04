import * as dotenv from 'dotenv';

// importing .env variables
dotenv.config();
const checkStrVar = (variable: string | undefined, name: string): string => {
  if (!variable) throw new Error(`undefined variable: ${name}`);
  return variable;
};


const WALLET_PRIVATE_KEY = checkStrVar(
  process.env.WALLET_PRIVATE_KEY,
  'WALLET_PRIVATE_KEY',
);


const ENTITY_DID = checkStrVar(process.env.ENTITY_DID, 'ENTITY_DID');

const ENTITY_NAME = checkStrVar(process.env.ENTITY_NAME, 'ENTITY_NAME');

export {
  WALLET_PRIVATE_KEY,
  ENTITY_DID,
  ENTITY_NAME,
};
