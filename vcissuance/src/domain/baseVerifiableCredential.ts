import { IVerifiableCredential } from './iVerifiableCredential';
import {
  InputCredential,
  VerifiableCredential,
  Credential,
} from '../dtos/credentials';
export default abstract class BaseVerifiableCredential
  implements IVerifiableCredential
{
  createCredentialPayload(inputCredential: InputCredential): Credential {
    if (!inputCredential) throw new Error('No input credential provided.');
    const { expirationDate, ...input } = inputCredential;
    // add context if it is not already defined
    const credential: Credential = {
      '@context': inputCredential['@context']
        ? inputCredential['@context']
        : ['https://www.w3.org/2018/credentials/v1'],
      ...input,
      validUntil: inputCredential.validUntil || (expirationDate as string),
    };
    return credential;
  }

  createVerifiableCredential(vcJwt: string): VerifiableCredential {
    throw new Error('Method not implemented.');
  }
}
