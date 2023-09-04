import { Injectable } from '@nestjs/common';
import { InputCredential, Credential } from '../dtos/credentials';
import { isValidDid } from '../utils/methodCheck';
import EtherVerifiableCredential from '../domain/etherVerifiableCredential';

export interface VerifiableCredentialPayloadCreationRequest {
  credentialInput: InputCredential;
}

export interface VerifiableCredentialPayloadCreationResponse {
  credential: Credential;
}
@Injectable()
export default class VerifiableCredentialPayloadCreator {
  execute(
    request: VerifiableCredentialPayloadCreationRequest,
  ): VerifiableCredentialPayloadCreationResponse {
    const issuer = this.extractIssuerOrFail(request.credentialInput);
    this.validateInputCredential(request.credentialInput);
    const verifiableCredentialPayload =
      new EtherVerifiableCredential().createCredentialPayload(
        request.credentialInput,
      );
    return { credential: verifiableCredentialPayload };
  }

  private extractIssuerOrFail(credential: InputCredential): string {
    try {
      return typeof credential.issuer === 'string'
        ? credential.issuer
        : credential.issuer.id;
    } catch {
      throw new Error('No issuer was found in credential payload');
    }
  }

  private validateInputCredential(input: InputCredential): void {
    if (!input.credentialSubject) {
      throw new Error('Missing credentialSubject object');
    }
    if (
      input.credentialSubject.id &&
      !isValidDid(input.credentialSubject.id as string)
    ) {
      throw new Error(
        `The did provided as credentialSubject identifier is not valid. Did must look like: did:<method>:<identifier>.`,
      );
    }
  }
}
