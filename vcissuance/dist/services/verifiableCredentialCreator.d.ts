import { VerifiableCredential } from '../dtos/credentials';
export interface VerifiableCredentialCreationResponse {
    verifiableCredential: VerifiableCredential;
}
export interface VerifiableCredentialCreationRequest {
    jws: string;
}
export default class VerifiableCredentialCreator {
    execute(request: VerifiableCredentialCreationRequest): Promise<VerifiableCredentialCreationResponse>;
}
