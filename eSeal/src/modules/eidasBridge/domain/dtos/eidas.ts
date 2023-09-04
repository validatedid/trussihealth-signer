export interface Proof {
  type: string;
  created: string;
  proofPurpose: string;
  verificationMethod: string;
  jws?: string;
}
export interface EidasProof extends Proof {
  cades?: string;
  [x: string]: unknown;
}

export interface EIDASSignatureOutput {
  issuer: string;
  vc: VerifiableCredential;
}
export interface CredentialSubject {
  [x: string]: unknown;
}
export interface CredentialStatus {
  id: string;
  type: string;
  statusListIndex: string;
  statusListCredential: string;
}

export interface Issuer {
  id: string;
  name: string;
}

export interface InputCredential {
  id: string;
  '@context'?: string[];
  type: string[];
  credentialSubject: CredentialSubject;
  issuer: string | Issuer;
  issuanceDate: string;
  validUntil?: string;
  credentialStatus?: CredentialStatus;
  [x: string]: unknown;
}
export interface Credential extends InputCredential {
  '@context': string[];
}
export interface VerifiableCredential extends Credential {
  proof: Proof[];
}

export interface SignPayload {
  issuer: string;
  payload: VerifiableCredential;
  password: string;
  expiresIn?: number; // in seconds
}
