import KeyPairsRepository from '../infrastructure/keyPairsRepository';
export interface SignatureCreationRequest {
    issuer: string;
    payload: unknown;
    type: string;
    expiresIn?: number;
    kid?: string;
    alg?: string;
    selfIssued?: string;
}
export interface SignatureCreationResponse {
    jws: string;
}
export default class SignatureCreator {
    private keyPairsRepository;
    constructor(keyPairsRepository: KeyPairsRepository);
    private validateSignaturePayload;
    private getSignatureAlgorithm;
    execute(signatureCreationRequest: SignatureCreationRequest): Promise<SignatureCreationResponse>;
}
