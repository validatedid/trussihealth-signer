import BaseVerifiableCredential from './baseVerifiableCredential';
import {
  VerifiableCredential,
  VerifiableCredentialPayload,
} from '../dtos/credentials';
import { SignatureAlgorithm, SignatureTypes } from '../utils/signatures';
import { Injectable } from '@nestjs/common';
import JWT from '../utils/jwt';

@Injectable()
export default class EtherVerifiableCredential extends BaseVerifiableCredential {
  getSignatureType = (signatureAlgorithm: string): SignatureTypes => {
    if (
      !signatureAlgorithm ||
      (signatureAlgorithm !== SignatureAlgorithm.ES256K &&
        signatureAlgorithm !== SignatureAlgorithm.ES256KR)
    )
      throw new Error(
        'Signature algorithm not supported. The supported types are ES256K, ES256K-R and EdDSA',
      );
    if (
      signatureAlgorithm === SignatureAlgorithm.ES256K ||
      signatureAlgorithm === SignatureAlgorithm.ES256KR
    )
      return SignatureTypes.EcdsaSecp256k1Signature2019;
    throw new Error(
      'Signature algorithm not supported. The supported types are ES256K, ES256K-R and EdDSA',
    );
  };

  createVerifiableCredential(vcJwt: string): VerifiableCredential {
    const jwt = new JWT(vcJwt);
    const decodedVc = jwt.decodeJwt();
    const { alg, kid } = decodedVc.header;
    const { iat, iss, ...payload } = decodedVc.payload;
    if (!iss) throw new Error('No issuer found on the token');
    const decodedPayload = payload.vc as VerifiableCredentialPayload;
    return <VerifiableCredential>{
      '@context': decodedPayload['@context'],
      id: decodedPayload.id,
      type: decodedPayload.type,
      issuer: decodedPayload.issuer,
      credentialStatus: decodedPayload.credentialStatus,
      issuanceDate: new Date(iat * 1000).toISOString(),
      validUntil: decodedPayload.validUntil
        ? decodedPayload.validUntil
        : undefined,
      credentialSubject: decodedPayload.credentialSubject,
      proof: {
        type: this.getSignatureType(alg),
        created: new Date(iat * 1000).toISOString(),
        proofPurpose: 'assertionMethod',
        verificationMethod: (kid as string) || `${iss}#keys-1`,
        jws: vcJwt,
      },
    };
  }
}
