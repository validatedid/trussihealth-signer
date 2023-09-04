import { InputCredential, Credential } from '../dtos/credentials';
export interface VerifiableCredentialPayloadCreationRequest {
    credentialInput: InputCredential;
}
export interface VerifiableCredentialPayloadCreationResponse {
    credential: Credential;
}
export default class VerifiableCredentialPayloadCreator {
    execute(request: VerifiableCredentialPayloadCreationRequest): VerifiableCredentialPayloadCreationResponse;
    private extractIssuerOrFail;
    private validateInputCredential;
}
