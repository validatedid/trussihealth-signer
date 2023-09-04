"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureAlgorithm = exports.SignatureTypes = void 0;
var SignatureTypes;
(function (SignatureTypes) {
    SignatureTypes["EcdsaSecp256k1Signature2019"] = "EcdsaSecp256k1Signature2019";
    SignatureTypes["Ed25519Signature2018"] = "Ed25519Signature2018";
})(SignatureTypes = exports.SignatureTypes || (exports.SignatureTypes = {}));
var SignatureAlgorithm;
(function (SignatureAlgorithm) {
    SignatureAlgorithm["ES256KR"] = "ES256K-R";
    SignatureAlgorithm["ES256K"] = "ES256K";
    SignatureAlgorithm["EdDSA"] = "EdDSA";
})(SignatureAlgorithm = exports.SignatureAlgorithm || (exports.SignatureAlgorithm = {}));
//# sourceMappingURL=signatures.js.map