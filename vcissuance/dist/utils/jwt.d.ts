import { JWTDecoded, JWTVerified, JWTVerifyOptions } from 'did-jwt/lib/JWT';
export default class JWT {
    private jwt;
    constructor(jwt: string);
    validate(): void;
    decodeJwt(): JWTDecoded;
    verifyJwt(options: JWTVerifyOptions): Promise<JWTVerified>;
}
