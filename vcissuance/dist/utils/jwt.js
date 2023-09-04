"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const did_jwt_1 = require("did-jwt");
class JWT {
    constructor(jwt) {
        this.jwt = jwt;
        this.validate();
    }
    validate() {
        if (this.jwt.split('.').length !== 3) {
            throw Error('Unvalid string. JWT expected: header.payload.signature');
        }
    }
    decodeJwt() {
        return (0, did_jwt_1.decodeJWT)(this.jwt);
    }
    async verifyJwt(options) {
        const response = await (0, did_jwt_1.verifyJWT)(this.jwt, options);
        return response;
    }
}
exports.default = JWT;
//# sourceMappingURL=jwt.js.map