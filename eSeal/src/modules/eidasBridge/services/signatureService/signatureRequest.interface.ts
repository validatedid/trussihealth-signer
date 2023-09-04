import { VerifiableCredential } from '../../domain/dtos/eidas';

export interface SignPayload {
  issuer: string;
  payload: VerifiableCredential;
  password: string;
  expiresIn?: number; // in seconds
}

export interface SignatureRequest {
  signPayload: SignPayload;
}
