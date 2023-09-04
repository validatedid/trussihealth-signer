import { SignatureOptions } from '../../dtos/credentials';
import { EntityKeyPair } from '../../dtos/wallet';

export interface EnterpriseWallet {
  signJwt(data: Buffer, opts?: SignatureOptions): Promise<string>;

  // decrypt data using Component private key
  decrypt(dataToDecrypt: Buffer): Buffer | Promise<Buffer>;

  toPrimitives(): EntityKeyPair;
}
