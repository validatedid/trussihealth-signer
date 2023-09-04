"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joseWrapper = void 0;
const jose_1 = require("jose");
class JoseWrapper {
    constructor() {
        this.generateKeyPair = async (alg, options) => {
            return (0, jose_1.generateKeyPair)(alg, options);
        };
        this.exportJWK = async (key) => {
            return (0, jose_1.exportJWK)(key);
        };
        this.verifyJwt = async (session, key, alg) => {
            return (0, jose_1.jwtVerify)(session, await (0, jose_1.importJWK)(key, alg || 'ES256K'));
        };
        this.signJwt = async (jwk, payload, header) => {
            const jws = new jose_1.SignJWT(JSON.parse(payload.toString()))
                .setProtectedHeader(header || {
                alg: 'ES256K',
                typ: 'JWT',
            })
                .sign(await (0, jose_1.importJWK)(jwk, 'ES256K'));
            return jws;
        };
        this.signJwtIssuer = async (jwk, payload, issuer) => {
            const jws = new jose_1.SignJWT(JSON.parse(payload.toString()))
                .setProtectedHeader({
                alg: 'ES256K',
                typ: 'JWT',
            })
                .setIssuer(issuer)
                .sign(await (0, jose_1.importJWK)(jwk, 'ES256K'));
            return jws;
        };
        this.signJwtIssuerIat = async (jwk, payload, issuer) => {
            const jws = new jose_1.SignJWT(JSON.parse(payload.toString()))
                .setProtectedHeader({
                alg: 'ES256K',
                typ: 'JWT',
            })
                .setIssuedAt()
                .setIssuer(issuer)
                .sign(await (0, jose_1.importJWK)(jwk, 'ES256K'));
            return jws;
        };
    }
}
const joseWrapper = new JoseWrapper();
exports.joseWrapper = joseWrapper;
//# sourceMappingURL=joseWrapper.js.map