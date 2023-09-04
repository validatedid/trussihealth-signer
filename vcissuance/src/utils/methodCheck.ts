const isEthrDid = (did: string): boolean => {
  if (!did) return false;
  if (did.match(/^did:ethr:0x/g)) return true;
  return false;
};

const isKeyDid = (did: string): boolean => {
  if (!did) return false;
  if (did.match(/^did:key:/g)) return true;
  return false;
};

const isEbsiDid = (did: string): boolean => {
  if (!did) return false;
  if (did.match(/^did:ebsi:/g)) return true;
  return false;
};
const isAlastriaDid = (did: string): boolean => {
  if (!did) return false;
  if (did.match(/^did:ala:/g)) {
    return true;
  }
  return false;
};

const isValidDid = (did: string): boolean => {
  return (
    isEthrDid(did) || isKeyDid(did) || isEbsiDid(did) || isAlastriaDid(did)
  );
};
export { isEthrDid, isKeyDid, isEbsiDid, isAlastriaDid, isValidDid };
