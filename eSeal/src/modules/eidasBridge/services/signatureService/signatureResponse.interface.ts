import { VerifiableCredential } from '../../domain/dtos/eidas';

export interface SignatureResponse {
  verifiableCredential: VerifiableCredential;
}
