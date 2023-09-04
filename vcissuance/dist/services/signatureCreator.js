"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
const common_1 = require("@nestjs/common");
const signatures_1 = require("../utils/signatures");
const keyPairsRepository_1 = require("../infrastructure/keyPairsRepository");
const etherWallet_1 = require("../domain/wallet/etherWallet");
let SignatureCreator = class SignatureCreator {
    constructor(keyPairsRepository) {
        this.keyPairsRepository = keyPairsRepository;
    }
    validateSignaturePayload(signPayload) {
        if (!signPayload ||
            !signPayload.issuer ||
            !signPayload.payload ||
            !signPayload.type)
            throw new Error('Signature body requires issuer, payload and type.');
        if (signPayload.type !== signatures_1.SignatureTypes.EcdsaSecp256k1Signature2019 &&
            signPayload.type !== signatures_1.SignatureTypes.Ed25519Signature2018)
            throw new Error('Signature type not supported.');
    }
    getSignatureAlgorithm(signatureType) {
        if (!signatureType ||
            (signatureType !== signatures_1.SignatureTypes.EcdsaSecp256k1Signature2019 &&
                signatureType !== signatures_1.SignatureTypes.Ed25519Signature2018))
            throw new Error('Signature type not supported, the only supported are Ed25519Signature2018 and EcdsaSecp256k1Signature2019');
        if (signatureType === signatures_1.SignatureTypes.EcdsaSecp256k1Signature2019)
            return signatures_1.SignatureAlgorithm.ES256K;
        if (signatureType === signatures_1.SignatureTypes.Ed25519Signature2018)
            return signatures_1.SignatureAlgorithm.EdDSA;
        throw new Error('Signature type not supported, the only supported are Ed25519Signature2018 and EcdsaSecp256k1Signature2019');
    }
    async execute(signatureCreationRequest) {
        const entityData = await this.keyPairsRepository.findEntityDataByDid(signatureCreationRequest.issuer);
        if (!entityData)
            throw new Error(`Wallet not found ${signatureCreationRequest.issuer}`);
        const enterpriseWallet = new etherWallet_1.default(((_a) => {
            var { name } = _a, o = __rest(_a, ["name"]);
            return o;
        })(entityData));
        this.validateSignaturePayload(signatureCreationRequest);
        const kid = `${signatureCreationRequest.issuer}#keys-1`;
        const opts = {
            issuer: signatureCreationRequest.issuer,
            kid: signatureCreationRequest.kid || kid,
            expiresIn: signatureCreationRequest.expiresIn,
            alg: signatureCreationRequest.alg ||
                this.getSignatureAlgorithm(signatureCreationRequest.type),
            selfIssued: signatureCreationRequest.selfIssued,
        };
        const jws = await enterpriseWallet.signJwt(Buffer.from(JSON.stringify(signatureCreationRequest.payload)), opts);
        if (!jws)
            throw new Error('Error on creating the JWS Signature');
        return { jws };
    }
};
SignatureCreator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [keyPairsRepository_1.default])
], SignatureCreator);
exports.default = SignatureCreator;
//# sourceMappingURL=signatureCreator.js.map