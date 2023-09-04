import {
  importJWK,
  JWK,
  jwtVerify,
  JWTVerifyResult,
  SignJWT,
  generateKeyPair,
  GenerateKeyPairResult,
  exportJWK,
  KeyLike,
  JWTPayload,
  JWTHeaderParameters,
} from 'jose';

class JoseWrapper {
  generateKeyPair = async (
    alg: string,
    options: { crv: string },
  ): Promise<GenerateKeyPairResult> => {
    return generateKeyPair(alg, options);
  };

  exportJWK = async (key: KeyLike): Promise<JWK> => {
    return exportJWK(key);
  };

  verifyJwt = async (
    session: string,
    key: JWK,
    alg?: string,
  ): Promise<JWTVerifyResult> => {
    return jwtVerify(session, await importJWK(key, alg || 'ES256K'));
  };

  signJwt = async (
    jwk: JWK,
    payload: Buffer,
    header?: JWTHeaderParameters,
  ): Promise<string> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const jws = new SignJWT(JSON.parse(payload.toString()))
      .setProtectedHeader(
        header || {
          alg: 'ES256K',
          typ: 'JWT',
        },
      )
      .sign(await importJWK(jwk, 'ES256K'));

    return jws;
  };

  signJwtIssuer = async (
    jwk: JWK,
    payload: Buffer,
    issuer: string,
  ): Promise<string> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const jws = new SignJWT(JSON.parse(payload.toString()))
      .setProtectedHeader({
        alg: 'ES256K',
        typ: 'JWT',
      })
      .setIssuer(issuer)
      .sign(await importJWK(jwk, 'ES256K'));
    return jws;
  };

  signJwtIssuerIat = async (
    jwk: JWK,
    payload: Buffer,
    issuer: string,
  ): Promise<string> => {
    const jws = new SignJWT(JSON.parse(payload.toString()) as JWTPayload)
      .setProtectedHeader({
        alg: 'ES256K',
        typ: 'JWT',
      })
      .setIssuedAt()
      .setIssuer(issuer)
      .sign(await importJWK(jwk, 'ES256K'));
    return jws;
  };
}
const joseWrapper = new JoseWrapper();
export { joseWrapper, JWK, JWTVerifyResult };
