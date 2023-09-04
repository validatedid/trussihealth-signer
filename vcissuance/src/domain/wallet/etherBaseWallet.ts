import { createJWT, ES256KSigner, JWTHeader, JWTPayload } from 'did-jwt';
import { ethers } from 'ethers';
import { decrypt } from 'eciesjs';
import { EnterpriseWallet } from './enterpriseWallet';
import { EntityKeyPair } from '../../dtos/wallet';
import { SignatureOptions } from '../../dtos/credentials';
import { SignatureAlgorithm } from '../../utils/signatures';

export default abstract class EtherBaseWallet implements EnterpriseWallet {
  protected wallet: ethers.Wallet;

  constructor(protected entityKeyPair: EntityKeyPair) {}

  protected async loadWallet(): Promise<void> {
    if (this.wallet) return;
    this.wallet = new ethers.Wallet(this.entityKeyPair.data.key);
  }

  async signJwt(data: Buffer, opts?: SignatureOptions): Promise<string> {
    await this.loadWallet();
    if (
      opts &&
      opts.alg &&
      opts.alg !== SignatureAlgorithm.ES256K &&
      opts.alg !== SignatureAlgorithm.ES256KR
    )
      throw new Error(
        'Invalid algorithm. Supported algorithms are ES256K, ES256K-R and EdDSA',
      );

    const header: JWTHeader = {
      alg: opts && opts.alg ? opts.alg : 'ES256K-R',
      typ: 'JWT',
      kid: opts && opts.kid ? opts.kid : undefined,
    };

    const signer = ES256KSigner(
      Buffer.from(this.wallet.privateKey.replace('0x', ''), 'hex'),
      header.alg === 'ES256K-R',
    );
    const jwt = await createJWT(
      JSON.parse(data.toString()) as JWTPayload,
      {
        issuer: opts?.selfIssued || `${this.entityKeyPair.did}`,
        alg: opts?.alg || 'ES256K-R',
        signer,
        expiresIn: opts?.expiresIn || undefined,
        canonicalize: true,
      },
      header,
    );
    return jwt;
  }

  async decrypt(dataToDecrypt: Buffer): Promise<Buffer> {
    await this.loadWallet();
    return decrypt(this.wallet.privateKey, dataToDecrypt);
  }

  toPrimitives(): EntityKeyPair {
    return this.entityKeyPair;
  }
}
