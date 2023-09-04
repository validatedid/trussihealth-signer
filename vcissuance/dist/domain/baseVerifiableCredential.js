"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
class BaseVerifiableCredential {
    createCredentialPayload(inputCredential) {
        if (!inputCredential)
            throw new Error('No input credential provided.');
        const { expirationDate } = inputCredential, input = __rest(inputCredential, ["expirationDate"]);
        const credential = Object.assign(Object.assign({ '@context': inputCredential['@context']
                ? inputCredential['@context']
                : ['https://www.w3.org/2018/credentials/v1'] }, input), { validUntil: inputCredential.validUntil || expirationDate });
        return credential;
    }
    createVerifiableCredential(vcJwt) {
        throw new Error('Method not implemented.');
    }
}
exports.default = BaseVerifiableCredential;
//# sourceMappingURL=baseVerifiableCredential.js.map