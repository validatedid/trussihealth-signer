enum EidasBridgeMessages {
  ERROR_VERIFYING_SIGNATURE = 'Error on verifying signature',
  NO_CADES_SIGNATURE_FOUND = 'No cades signature found',
  SIGNATURE_BAD_PARAMS = 'Signature body requires issuer, payload and password.',
  NO_PEM_CADES = 'PEM CADES Signature not provided.',
  ERROR_PARSING_P12_DATA = 'Error parsing P12 data',
  SIGN_EIDAS_BAD_PARAMETERS = 'Sign Eidas requires a SignPayload with issuer, payload, type and password',
  CREDENTIAL_PAYLOAD_MISMATCH_SIGNED_DATA = 'Verification Credential payload does not match signed data',
  INDETERMINATE = 'The certificate chain for signature is not trusted, it does not contain a trust anchor.',
  WALLET_BUILDER_BAD_PARAMS = 'Wallet creation requires a DID and a password.',
  VERIFICATION_OUTPUT_INVALID = 'The verification output obtained is not valid',
}

export {
  EidasBridgeMessages,
};
