export interface InputCredentialOptions {
    credential: InputCredential;
    options?: InputOptions;
}
export interface InputOptions {
    revocable?: boolean;
    delivery?: boolean;
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
export interface CredentialSubject {
    [x: string]: unknown;
}
export interface InputCredential {
    id: string;
    '@context'?: string[];
    type: string[];
    credentialSubject: CredentialSubject;
    issuer: string | Issuer;
    issuanceDate?: string;
    validUntil?: string;
    credentialStatus?: CredentialStatus;
    eseal?: string;
    [x: string]: unknown;
}
export interface Credential extends InputCredential {
    '@context': string[];
}
export interface VerifiableCredential extends Credential {
    issuanceDate: string;
    proof: Proof;
}
export interface Proof {
    type: string;
    created: string;
    proofPurpose: string;
    verificationMethod: string;
    jws: string;
    [x: string]: string;
}
export interface VerifiableCredentialPayload {
    sub?: string;
    vc: Credential;
    nbf?: number;
    aud?: string;
    exp?: number;
    jti?: string;
    [x: string]: unknown;
}
export interface SignaturePayload {
    issuer: string;
    payload: unknown;
    type: string;
    expiresIn?: number;
}
export interface SignatureOptions {
    issuer: string;
    kid: string;
    expiresIn?: number;
    alg?: string;
    selfIssued?: string;
}
