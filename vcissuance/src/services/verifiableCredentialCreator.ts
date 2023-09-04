import { Injectable } from '@nestjs/common';
import { VerifiableCredential } from '../dtos/credentials';
import EtherVerifiableCredential from '../domain/etherVerifiableCredential';

export interface VerifiableCredentialCreationResponse {
  verifiableCredential: VerifiableCredential;
}

export interface VerifiableCredentialCreationRequest {
  jws: string;
}

@Injectable()
export default class VerifiableCredentialCreator {
  async execute(
    request: VerifiableCredentialCreationRequest,
  ): Promise<VerifiableCredentialCreationResponse> {
    const verifiableCredentialInstance = new EtherVerifiableCredential();
    const verifiableCredential =
      verifiableCredentialInstance.createVerifiableCredential(request.jws);
    return { verifiableCredential };
  }
}
