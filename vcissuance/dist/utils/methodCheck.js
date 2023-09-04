"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDid = exports.isAlastriaDid = exports.isEbsiDid = exports.isKeyDid = exports.isEthrDid = void 0;
const isEthrDid = (did) => {
    if (!did)
        return false;
    if (did.match(/^did:ethr:0x/g))
        return true;
    return false;
};
exports.isEthrDid = isEthrDid;
const isKeyDid = (did) => {
    if (!did)
        return false;
    if (did.match(/^did:key:/g))
        return true;
    return false;
};
exports.isKeyDid = isKeyDid;
const isEbsiDid = (did) => {
    if (!did)
        return false;
    if (did.match(/^did:ebsi:/g))
        return true;
    return false;
};
exports.isEbsiDid = isEbsiDid;
const isAlastriaDid = (did) => {
    if (!did)
        return false;
    if (did.match(/^did:ala:/g)) {
        return true;
    }
    return false;
};
exports.isAlastriaDid = isAlastriaDid;
const isValidDid = (did) => {
    return (isEthrDid(did) || isKeyDid(did) || isEbsiDid(did) || isAlastriaDid(did));
};
exports.isValidDid = isValidDid;
//# sourceMappingURL=methodCheck.js.map