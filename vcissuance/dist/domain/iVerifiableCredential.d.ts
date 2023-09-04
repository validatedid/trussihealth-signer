import { InputCredential, VerifiableCredential, Credential } from '../dtos/credentials';
export interface IVerifiableCredential {
    createCredentialPayload(inputCredential: InputCredential): Credential;
    createVerifiableCredential(vcJwt: string): VerifiableCredential;
}
export interface VcInput {
    vc: VerifiableCredential;
}
