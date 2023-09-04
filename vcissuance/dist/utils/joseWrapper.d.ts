import { JWK, JWTVerifyResult, GenerateKeyPairResult, KeyLike, JWTHeaderParameters } from 'jose';
declare class JoseWrapper {
    generateKeyPair: (alg: string, options: {
        crv: string;
    }) => Promise<GenerateKeyPairResult>;
    exportJWK: (key: KeyLike) => Promise<JWK>;
    verifyJwt: (session: string, key: JWK, alg?: string) => Promise<JWTVerifyResult>;
    signJwt: (jwk: JWK, payload: Buffer, header?: JWTHeaderParameters) => Promise<string>;
    signJwtIssuer: (jwk: JWK, payload: Buffer, issuer: string) => Promise<string>;
    signJwtIssuerIat: (jwk: JWK, payload: Buffer, issuer: string) => Promise<string>;
}
declare const joseWrapper: JoseWrapper;
export { joseWrapper, JWK, JWTVerifyResult };
