"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const baseVerifiableCredential_1 = require("./baseVerifiableCredential");
const signatures_1 = require("../utils/signatures");
const common_1 = require("@nestjs/common");
const jwt_1 = require("../utils/jwt");
let EtherVerifiableCredential = class EtherVerifiableCredential extends baseVerifiableCredential_1.default {
    constructor() {
        super(...arguments);
        this.getSignatureType = (signatureAlgorithm) => {
            if (!signatureAlgorithm ||
                (signatureAlgorithm !== signatures_1.SignatureAlgorithm.ES256K &&
                    signatureAlgorithm !== signatures_1.SignatureAlgorithm.ES256KR))
                throw new Error('Signature algorithm not supported. The supported types are ES256K, ES256K-R and EdDSA');
            if (signatureAlgorithm === signatures_1.SignatureAlgorithm.ES256K ||
                signatureAlgorithm === signatures_1.SignatureAlgorithm.ES256KR)
                return signatures_1.SignatureTypes.EcdsaSecp256k1Signature2019;
            throw new Error('Signature algorithm not supported. The supported types are ES256K, ES256K-R and EdDSA');
        };
    }
    createVerifiableCredential(vcJwt) {
        const jwt = new jwt_1.default(vcJwt);
        const decodedVc = jwt.decodeJwt();
        const { alg, kid } = decodedVc.header;
        const _a = decodedVc.payload, { iat, iss } = _a, payload = __rest(_a, ["iat", "iss"]);
        if (!iss)
            throw new Error('No issuer found on the token');
        const decodedPayload = payload.vc;
        return {
            '@context': decodedPayload['@context'],
            id: decodedPayload.id,
            type: decodedPayload.type,
            issuer: decodedPayload.issuer,
            credentialStatus: decodedPayload.credentialStatus,
            issuanceDate: new Date(iat * 1000).toISOString(),
            validUntil: decodedPayload.validUntil
                ? decodedPayload.validUntil
                : undefined,
            credentialSubject: decodedPayload.credentialSubject,
            proof: {
                type: this.getSignatureType(alg),
                created: new Date(iat * 1000).toISOString(),
                proofPurpose: 'assertionMethod',
                verificationMethod: kid || `${iss}#keys-1`,
                jws: vcJwt,
            },
        };
    }
};
EtherVerifiableCredential = __decorate([
    (0, common_1.Injectable)()
], EtherVerifiableCredential);
exports.default = EtherVerifiableCredential;
//# sourceMappingURL=etherVerifiableCredential.js.map