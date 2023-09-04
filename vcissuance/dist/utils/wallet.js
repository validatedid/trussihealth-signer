"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHex = exports.prefixWith0x = exports.generateKeys = void 0;
const joseWrapper_1 = require("./joseWrapper");
const generateKeys = async (alg) => {
    const { publicKey, privateKey } = await joseWrapper_1.joseWrapper.generateKeyPair(alg, {
        crv: 'EC',
    });
    return {
        publicJwk: await joseWrapper_1.joseWrapper.exportJWK(publicKey),
        privateJwk: await joseWrapper_1.joseWrapper.exportJWK(privateKey),
    };
};
exports.generateKeys = generateKeys;
const prefixWith0x = (key) => {
    return key.startsWith('0x') ? key : `0x${key}`;
};
exports.prefixWith0x = prefixWith0x;
const toHex = (data) => Buffer.from(data, 'base64').toString('hex');
exports.toHex = toHex;
//# sourceMappingURL=wallet.js.map