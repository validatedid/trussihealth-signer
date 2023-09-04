import { Body, Controller, Post } from '@nestjs/common';
import {
  InputCredentialOptions,
  SignaturePayload,
  VerifiableCredential,
} from './dtos/credentials';
import VerifiableCredentialPayloadCreator, {
  VerifiableCredentialPayloadCreationRequest,
} from './services/verifiableCredentialPayloadCreator';
import { SignatureTypes } from './utils/signatures';
import SignatureCreator from './services/signatureCreator';
import VerifiableCredentialCreator from './services/verifiableCredentialCreator';

@Controller()
export class AppController {
  constructor(
    private readonly verifiableCredentialPayloadCreator: VerifiableCredentialPayloadCreator,
    private readonly signatureCreator: SignatureCreator,
    private readonly verifiableCredentialCreator: VerifiableCredentialCreator,
  ) {}

  @Post('/verifiable-credential/v1/signatures')
  async credentialIssuance(
    @Body() inputCredential: InputCredentialOptions,
  ): Promise<VerifiableCredential> {
    const payloadCreationRequest = {
      credentialInput: inputCredential.credential,
    } as VerifiableCredentialPayloadCreationRequest;
    const payloadCreationResponse =
      this.verifiableCredentialPayloadCreator.execute(payloadCreationRequest);

    const issuer =
      typeof inputCredential.credential.issuer === 'string'
        ? inputCredential.credential.issuer
        : inputCredential.credential.issuer.id;

    const signPayload: SignaturePayload = {
      issuer,
      payload: {
        vc: payloadCreationResponse.credential,
      },
      type: SignatureTypes.EcdsaSecp256k1Signature2019,
    };
    const signedPayload = await this.signatureCreator.execute(signPayload);
    const vcResponse = await this.verifiableCredentialCreator.execute(
      signedPayload,
    );
    return vcResponse.verifiableCredential;
  }
}
