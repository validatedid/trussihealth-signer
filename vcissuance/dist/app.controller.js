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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const verifiableCredentialPayloadCreator_1 = require("./services/verifiableCredentialPayloadCreator");
const signatures_1 = require("./utils/signatures");
const signatureCreator_1 = require("./services/signatureCreator");
const verifiableCredentialCreator_1 = require("./services/verifiableCredentialCreator");
let AppController = class AppController {
    constructor(verifiableCredentialPayloadCreator, signatureCreator, verifiableCredentialCreator) {
        this.verifiableCredentialPayloadCreator = verifiableCredentialPayloadCreator;
        this.signatureCreator = signatureCreator;
        this.verifiableCredentialCreator = verifiableCredentialCreator;
    }
    async credentialIssuance(inputCredential) {
        const payloadCreationRequest = {
            credentialInput: inputCredential.credential,
        };
        const payloadCreationResponse = this.verifiableCredentialPayloadCreator.execute(payloadCreationRequest);
        const issuer = typeof inputCredential.credential.issuer === 'string'
            ? inputCredential.credential.issuer
            : inputCredential.credential.issuer.id;
        const signPayload = {
            issuer,
            payload: {
                vc: payloadCreationResponse.credential,
            },
            type: signatures_1.SignatureTypes.EcdsaSecp256k1Signature2019,
        };
        const signedPayload = await this.signatureCreator.execute(signPayload);
        const vcResponse = await this.verifiableCredentialCreator.execute(signedPayload);
        return vcResponse.verifiableCredential;
    }
};
__decorate([
    (0, common_1.Post)('/api/v1/verifiable-credentials'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "credentialIssuance", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [verifiableCredentialPayloadCreator_1.default,
        signatureCreator_1.default,
        verifiableCredentialCreator_1.default])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map