import { Injectable } from '@nestjs/common';
import { EidasBridgeMessages } from '../../exceptions/codes';
import {
  Credential,
  VerifiableCredential,
} from '../../domain/dtos/eidas';
import { signEidas } from '../../domain/eidas';
import CertificatesRepository from '../../repository/certificatesRepository';
import { isVerifiableCredential } from '../../utils/ssi';
import { SignatureRequest } from './signatureRequest.interface';
import { SignatureResponse } from './signatureResponse.interface';

@Injectable()
export default class SignatureService {
  constructor(private certificatesRepository: CertificatesRepository) {}

  async execute(signRequest: SignatureRequest): Promise<SignatureResponse> {
    if (
      !signRequest.signPayload ||
      !signRequest.signPayload.payload ||
      !signRequest.signPayload.password ||
      !isVerifiableCredential(signRequest.signPayload.payload)
    )
      throw new Error(
        EidasBridgeMessages.SIGNATURE_BAD_PARAMS,
      );

    const certificate =
       this.certificatesRepository.loadCertificate(
      );

    const { payload } = signRequest.signPayload;
    // sign with another keypair
    const eidasProof = await signEidas(
      signRequest.signPayload,
      certificate,
    );

    if (Array.isArray(payload.proof)) payload.proof.push(eidasProof);
    const vc: VerifiableCredential = {
      ...(payload as Credential),
      proof: Array.isArray(payload.proof)
        ? payload.proof
        : [payload.proof, eidasProof],
    };

    return { verifiableCredential: vc };
  }
}
