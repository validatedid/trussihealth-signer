"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const did_jwt_1 = require("did-jwt");
const ethers_1 = require("ethers");
const eciesjs_1 = require("eciesjs");
const signatures_1 = require("../../utils/signatures");
const passwordCipherWallet_1 = require("./passwordCipherWallet");
const config_1 = require("../../config");
class EtherBaseWallet {
    constructor(entiyKeyPair) {
        this.entiyKeyPair = entiyKeyPair;
    }
    async loadWallet() {
        if (this.wallet)
            return;
        const decryptedPassword = (await passwordCipherWallet_1.default.loadWallet(config_1.COMPONENT_KEYSTORE, config_1.COMPONENT_PASSWORD)).decrypt(this.entiyKeyPair.data.encryptedPassword);
        this.wallet = await ethers_1.ethers.Wallet.fromEncryptedJson(this.entiyKeyPair.data.key, decryptedPassword);
    }
    async signJwt(data, opts) {
        await this.loadWallet();
        if (opts &&
            opts.alg &&
            opts.alg !== signatures_1.SignatureAlgorithm.ES256K &&
            opts.alg !== signatures_1.SignatureAlgorithm.ES256KR)
            throw new Error('Invalid algorithm. Supported algorithms are ES256K, ES256K-R and EdDSA');
        const header = {
            alg: opts && opts.alg ? opts.alg : 'ES256K-R',
            typ: 'JWT',
            kid: opts && opts.kid ? opts.kid : undefined,
        };
        const signer = (0, did_jwt_1.ES256KSigner)(Buffer.from(this.wallet.privateKey.replace('0x', ''), 'hex'), header.alg === 'ES256K-R');
        const jwt = await (0, did_jwt_1.createJWT)(JSON.parse(data.toString()), {
            issuer: (opts === null || opts === void 0 ? void 0 : opts.selfIssued) || `${this.entiyKeyPair.did}`,
            alg: (opts === null || opts === void 0 ? void 0 : opts.alg) || 'ES256K-R',
            signer,
            expiresIn: (opts === null || opts === void 0 ? void 0 : opts.expiresIn) || undefined,
            canonicalize: true,
        }, header);
        return jwt;
    }
    async decrypt(dataToDecrypt) {
        await this.loadWallet();
        return (0, eciesjs_1.decrypt)(this.wallet.privateKey, dataToDecrypt);
    }
    toPrimitives() {
        return this.entiyKeyPair;
    }
}
exports.default = EtherBaseWallet;
//# sourceMappingURL=etherBaseWallet.js.map