/// <reference types="node" />
import { ethers } from 'ethers';
import { EnterpriseWallet } from './enterpriseWallet';
import { EntityKeyPair } from '../../dtos/wallet';
import { SignatureOptions } from '../../dtos/credentials';
export default abstract class EtherBaseWallet implements EnterpriseWallet {
    protected entiyKeyPair: EntityKeyPair;
    protected wallet: ethers.Wallet;
    constructor(entiyKeyPair: EntityKeyPair);
    protected loadWallet(): Promise<void>;
    signJwt(data: Buffer, opts?: SignatureOptions): Promise<string>;
    decrypt(dataToDecrypt: Buffer): Promise<Buffer>;
    toPrimitives(): EntityKeyPair;
}
