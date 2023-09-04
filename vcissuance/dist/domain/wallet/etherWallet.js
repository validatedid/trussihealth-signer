"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const config_1 = require("../../config");
const passwordCipherWallet_1 = require("./passwordCipherWallet");
const etherBaseWallet_1 = require("./etherBaseWallet");
const wallet_1 = require("../../utils/wallet");
class EtherWallet extends etherBaseWallet_1.default {
    static async create() {
        const privateKey = (await (0, wallet_1.generateKeys)('ES256K')).privateJwk;
        const wallet = new ethers_1.ethers.Wallet((0, wallet_1.prefixWith0x)((0, wallet_1.toHex)(privateKey.d)));
        const password = ethers_1.utils
            .hexlify(ethers_1.ethers.BigNumber.from(ethers_1.utils.randomBytes(32)))
            .replace('0x', '');
        const encryptedKey = await wallet.encrypt(password);
        const encryptedPassword = (await passwordCipherWallet_1.default.loadWallet(config_1.COMPONENT_KEYSTORE, config_1.COMPONENT_PASSWORD)).encrypt(password);
        const keyPairData = {
            key: encryptedKey,
            publicKey: wallet.publicKey,
            encryptedPassword,
        };
        const entityKeyPair = {
            did: `did:ethr:${wallet.address}`,
            data: keyPairData,
        };
        const etherWallet = new EtherWallet(entityKeyPair);
        return etherWallet;
    }
}
exports.default = EtherWallet;
//# sourceMappingURL=etherWallet.js.map