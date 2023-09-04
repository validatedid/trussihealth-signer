import { InputCredentialOptions, VerifiableCredential } from './dtos/credentials';
import VerifiableCredentialPayloadCreator from './services/verifiableCredentialPayloadCreator';
import SignatureCreator from './services/signatureCreator';
import VerifiableCredentialCreator from './services/verifiableCredentialCreator';
export declare class AppController {
    private readonly verifiableCredentialPayloadCreator;
    private readonly signatureCreator;
    private readonly verifiableCredentialCreator;
    constructor(verifiableCredentialPayloadCreator: VerifiableCredentialPayloadCreator, signatureCreator: SignatureCreator, verifiableCredentialCreator: VerifiableCredentialCreator);
    credentialIssuance(inputCredential: InputCredentialOptions): Promise<VerifiableCredential>;
}
