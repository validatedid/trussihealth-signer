import { IVerifiableCredential } from './iVerifiableCredential';
import { InputCredential, VerifiableCredential, Credential } from '../dtos/credentials';
export default abstract class BaseVerifiableCredential implements IVerifiableCredential {
    createCredentialPayload(inputCredential: InputCredential): Credential;
    createVerifiableCredential(vcJwt: string): VerifiableCredential;
}
