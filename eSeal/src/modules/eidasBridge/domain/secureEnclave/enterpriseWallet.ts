import { EidasBridgeMessages } from '../../exceptions/codes';
import { eidasCrypto } from '../../utils';
import { signCadesRsa } from './cades';
import { CadesSignatureInput, CadesSignatureOutput } from '../dtos/cades';
import { WalletBuilderOptions } from '../dtos/wallet';
import { calculateLdProofHashforVerification } from '../../utils/ssi';
import { EidasProof, Credential } from '../dtos/eidas';

export default class EnterpriseWallet {
  private constructor(
    private issuerPemCert: string[],
    private issuerPemPrivateKey: string,
  ) {}

  static createInstance(
    options: WalletBuilderOptions,
    certificate: string,
  ): EnterpriseWallet {
    if (!options || !options.password)
      throw new Error(EidasBridgeMessages.WALLET_BUILDER_BAD_PARAMS);

    try {
      const parsedData = eidasCrypto.parseP12File(
        Buffer.from(certificate, 'hex'),
        options.password,
      );
      if (!parsedData || !parsedData.pemCert || !parsedData.pemPrivateKey)
        throw new Error(EidasBridgeMessages.ERROR_PARSING_P12_DATA);
      return new this(parsedData.pemCert, parsedData.pemPrivateKey);
    } catch (error) {
      throw new Error(
        `${EidasBridgeMessages.ERROR_PARSING_P12_DATA} : ${
          (error as Error).message
        }`,
      );
    }
  }

  getIssuerPemCert(): string {
    return this.issuerPemCert[0];
  }

  async eSeal(
    payload: Credential,
    proofOptions: EidasProof,
  ): Promise<CadesSignatureOutput> {
    // TODO: sign with all certificate list
    const dataToBeSigned: Buffer = await calculateLdProofHashforVerification(
      payload,
      proofOptions,
    );
    const dataToBeSignedHex = dataToBeSigned.toString('hex');
    const inputCades: CadesSignatureInput = {
      created: proofOptions.created,
      data: dataToBeSignedHex,
      pemCert: this.issuerPemCert[0],
      pemPrivKey: this.issuerPemPrivateKey,
    };
    return signCadesRsa(inputCades);
  }
}
