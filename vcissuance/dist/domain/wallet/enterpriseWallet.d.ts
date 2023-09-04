/// <reference types="node" />
import { SignatureOptions } from '../../dtos/credentials';
import { EntityKeyPair } from '../../dtos/wallet';
export interface EnterpriseWallet {
    signJwt(data: Buffer, opts?: SignatureOptions): Promise<string>;
    decrypt(dataToDecrypt: Buffer): Buffer | Promise<Buffer>;
    toPrimitives(): EntityKeyPair;
}
