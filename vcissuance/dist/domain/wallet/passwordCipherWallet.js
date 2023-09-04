"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eciesjs_1 = require("eciesjs");
const ethers_1 = require("ethers");
class PasswordCipherWallet {
    constructor(wallet) {
        this.wallet = wallet;
    }
    decrypt(encryptedPassword) {
        return (0, eciesjs_1.decrypt)(this.wallet.privateKey, Buffer.from(encryptedPassword, 'hex')).toString();
    }
    encrypt(password) {
        return (0, eciesjs_1.encrypt)(this.wallet.publicKey, Buffer.from(password)).toString('hex');
    }
    static async loadWallet(encryptedKeys, password) {
        const wallet = await ethers_1.ethers.Wallet.fromEncryptedJson(encryptedKeys, password);
        return new PasswordCipherWallet(wallet);
    }
}
exports.default = PasswordCipherWallet;
//# sourceMappingURL=passwordCipherWallet.js.map