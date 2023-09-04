import { SignPayload, EidasProof } from './dtos/eidas';
import { EnterpriseWallet } from './secureEnclave';
import {
  DEFAULT_PROOF_PURPOSE,
} from './@types/constants';
import {
  getKidFromDidAndPemCertificate,
  toISOStringSeconds,
} from '../utils/ssi';
import constants from './@types';
import { EidasBridgeMessages } from '../exceptions/codes';

const signEidas = async (
  signPayload: SignPayload,
  certificate: string,
): Promise<EidasProof> => {
  if (
    !signPayload ||
    !signPayload.payload ||
    !signPayload.password
  )
    throw new Error(EidasBridgeMessages.SIGN_EIDAS_BAD_PARAMETERS);

  const payloadToSign = (({ proof, ...o }) => o)(signPayload.payload);
  const wallet = EnterpriseWallet.createInstance(
    {
      password: signPayload.password,
    },
    certificate,
  );
  const createdDate: string = toISOStringSeconds(new Date(Date.now()));
  const proofOptions: EidasProof = {
    type: constants.SignatureTypes.CAdESRSASignature2020,
    created: createdDate,
    proofPurpose: DEFAULT_PROOF_PURPOSE,
    verificationMethod: getKidFromDidAndPemCertificate({
      did: signPayload.issuer,
      pemCertificate: wallet.getIssuerPemCert(),
    }),
  };
  const cadesOuput = await wallet.eSeal(payloadToSign, proofOptions);
  return {
    ...proofOptions,
    cades: cadesOuput.cades,
  };
};

export { signEidas };
