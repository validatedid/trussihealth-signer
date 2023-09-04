import { decodeJWT, verifyJWT } from 'did-jwt';
import { JWTDecoded, JWTVerified, JWTVerifyOptions } from 'did-jwt/lib/JWT';

export default class JWT {
  constructor(private jwt: string) {
    this.validate();
  }

  validate(): void {
    if (this.jwt.split('.').length !== 3) {
      throw Error('Unvalid string. JWT expected: header.payload.signature');
    }
  }

  decodeJwt(): JWTDecoded {
    return decodeJWT(this.jwt);
  }

  async verifyJwt(options: JWTVerifyOptions): Promise<JWTVerified> {
    const response = await verifyJWT(this.jwt, options);
    return response;
  }
}
