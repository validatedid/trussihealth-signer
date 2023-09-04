import { joseWrapper } from './joseWrapper';
import { JWK } from 'jose';

export interface JWKKeyPair {
  publicJwk: JWK;
  privateJwk: JWK;
}
const generateKeys = async (alg: string): Promise<JWKKeyPair> => {
  const { publicKey, privateKey } = await joseWrapper.generateKeyPair(alg, {
    crv: 'EC',
  });
  return {
    publicJwk: await joseWrapper.exportJWK(publicKey),
    privateJwk: await joseWrapper.exportJWK(privateKey),
  };
};

const prefixWith0x = (key: string): string => {
  return key.startsWith('0x') ? key : `0x${key}`;
};

const toHex = (data: string): string =>
  Buffer.from(data, 'base64').toString('hex');

export { generateKeys, prefixWith0x, toHex };
