import BaseVerifiableCredential from './baseVerifiableCredential';
import { VerifiableCredential } from '../dtos/credentials';
import { SignatureTypes } from '../utils/signatures';
export default class EtherVerifiableCredential extends BaseVerifiableCredential {
    getSignatureType: (signatureAlgorithm: string) => SignatureTypes;
    createVerifiableCredential(vcJwt: string): VerifiableCredential;
}
