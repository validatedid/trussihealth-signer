"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const methodCheck_1 = require("../utils/methodCheck");
const etherVerifiableCredential_1 = require("../domain/etherVerifiableCredential");
let VerifiableCredentialPayloadCreator = class VerifiableCredentialPayloadCreator {
    execute(request) {
        const issuer = this.extractIssuerOrFail(request.credentialInput);
        this.validateInputCredential(request.credentialInput);
        const verifiableCredentialPayload = new etherVerifiableCredential_1.default().createCredentialPayload(request.credentialInput);
        return { credential: verifiableCredentialPayload };
    }
    extractIssuerOrFail(credential) {
        try {
            return typeof credential.issuer === 'string'
                ? credential.issuer
                : credential.issuer.id;
        }
        catch (_a) {
            throw new Error('No issuer was found in credential payload');
        }
    }
    validateInputCredential(input) {
        if (!input.credentialSubject) {
            throw new Error('Missing credentialSubject object');
        }
        if (input.credentialSubject.id &&
            !(0, methodCheck_1.isValidDid)(input.credentialSubject.id)) {
            throw new Error(`The did provided as credentialSubject identifier is not valid. Did must look like: did:<method>:<identifier>.`);
        }
    }
};
VerifiableCredentialPayloadCreator = __decorate([
    (0, common_1.Injectable)()
], VerifiableCredentialPayloadCreator);
exports.default = VerifiableCredentialPayloadCreator;
//# sourceMappingURL=verifiableCredentialPayloadCreator.js.map