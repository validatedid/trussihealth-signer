import { Injectable } from '@nestjs/common';
import { SignatureAlgorithm, SignatureTypes } from '../utils/signatures';
import { SignatureOptions, SignaturePayload } from '../dtos/credentials';
import KeyPairsRepository from '../infrastructure/keyPairsRepository';
import EtherWallet from '../domain/wallet/etherWallet';

export interface SignatureCreationRequest {
  issuer: string;
  payload: unknown;
  type: string;
  expiresIn?: number; // in seconds
  kid?: string;
  alg?: string;
  selfIssued?: string;
}

export interface SignatureCreationResponse {
  jws: string;
}

@Injectable()
export default class SignatureCreator {
  constructor(private keyPairsRepository: KeyPairsRepository) {}

  private validateSignaturePayload(signPayload: SignaturePayload) {
    if (
      !signPayload ||
      !signPayload.issuer ||
      !signPayload.payload ||
      !signPayload.type
    )
      throw new Error('Signature body requires issuer, payload and type.');

    if (
      signPayload.type !== SignatureTypes.EcdsaSecp256k1Signature2019 &&
      signPayload.type !== SignatureTypes.Ed25519Signature2018
    )
      throw new Error('Signature type not supported.');
  }

  private getSignatureAlgorithm(signatureType: string): string {
    if (
      !signatureType ||
      (signatureType !== SignatureTypes.EcdsaSecp256k1Signature2019 &&
        signatureType !== SignatureTypes.Ed25519Signature2018)
    )
      throw new Error(
        'Signature type not supported, the only supported are Ed25519Signature2018 and EcdsaSecp256k1Signature2019',
      );
    if (signatureType === SignatureTypes.EcdsaSecp256k1Signature2019)
      return SignatureAlgorithm.ES256K;
    if (signatureType === SignatureTypes.Ed25519Signature2018)
      return SignatureAlgorithm.EdDSA;
    throw new Error(
      'Signature type not supported, the only supported are Ed25519Signature2018 and EcdsaSecp256k1Signature2019',
    );
  }

  async execute(
    signatureCreationRequest: SignatureCreationRequest,
  ): Promise<SignatureCreationResponse> {
    const entityData = await this.keyPairsRepository.findEntityDataByDid(
      signatureCreationRequest.issuer,
    );
    if (!entityData)
      throw new Error(`Wallet not found ${signatureCreationRequest.issuer}`);
    const enterpriseWallet = new EtherWallet(
      (({ name, ...o }) => o)(entityData),
    );

    this.validateSignaturePayload(signatureCreationRequest);

    const kid = `${signatureCreationRequest.issuer}#keys-1`;

    const opts: SignatureOptions = {
      issuer: signatureCreationRequest.issuer,
      kid: signatureCreationRequest.kid || kid,
      expiresIn: signatureCreationRequest.expiresIn,
      alg:
        signatureCreationRequest.alg ||
        this.getSignatureAlgorithm(signatureCreationRequest.type),
      selfIssued: signatureCreationRequest.selfIssued,
    };

    const jws: string = await enterpriseWallet.signJwt(
      Buffer.from(JSON.stringify(signatureCreationRequest.payload)),
      opts,
    );

    if (!jws) throw new Error('Error on creating the JWS Signature');
    return { jws };
  }
}
