"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENTITY_NAME = exports.ENTITY_DID = exports.WALLET_ENCRYPTING_PASSWORD = exports.WALLET_PUBLIC_KEY = exports.WALLET_PRIVATE_KEY = exports.COMPONENT_PASSWORD = exports.COMPONENT_KEYSTORE = void 0;
const dotenv = require("dotenv");
dotenv.config();
const checkStrVar = (variable, name) => {
    if (!variable)
        throw new Error(`undefined variable: ${name}`);
    return variable;
};
const COMPONENT_KEYSTORE = checkStrVar(process.env.COMPONENT_KEYSTORE, 'COMPONENT_KEYSTORE');
exports.COMPONENT_KEYSTORE = COMPONENT_KEYSTORE;
const COMPONENT_PASSWORD = checkStrVar(process.env.COMPONENT_PASSWORD, 'COMPONENT_PASSWORD');
exports.COMPONENT_PASSWORD = COMPONENT_PASSWORD;
const WALLET_PRIVATE_KEY = checkStrVar(process.env.WALLET_PRIVATE_KEY, 'WALLET_PRIVATE_KEY');
exports.WALLET_PRIVATE_KEY = WALLET_PRIVATE_KEY;
const WALLET_PUBLIC_KEY = checkStrVar(process.env.WALLET_PUBLIC_KEY, 'WALLET_PUBLIC_KEY');
exports.WALLET_PUBLIC_KEY = WALLET_PUBLIC_KEY;
const WALLET_ENCRYPTING_PASSWORD = checkStrVar(process.env.WALLET_ENCRYPTING_PASSWORD, 'WALLET_ENCRYPTING_PASSWORD');
exports.WALLET_ENCRYPTING_PASSWORD = WALLET_ENCRYPTING_PASSWORD;
const ENTITY_DID = checkStrVar(process.env.ENTITY_DID, 'ENTITY_DID');
exports.ENTITY_DID = ENTITY_DID;
const ENTITY_NAME = checkStrVar(process.env.ENTITY_NAME, 'ENTITY_NAME');
exports.ENTITY_NAME = ENTITY_NAME;
//# sourceMappingURL=config.js.map