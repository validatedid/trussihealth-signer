import { JWK } from 'jose';
export interface JWKKeyPair {
    publicJwk: JWK;
    privateJwk: JWK;
}
declare const generateKeys: (alg: string) => Promise<JWKKeyPair>;
declare const prefixWith0x: (key: string) => string;
declare const toHex: (data: string) => string;
export { generateKeys, prefixWith0x, toHex };
