/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { KJUR } from 'jsrsasign';
import constants from '../@types';
import {
  CadesSignatureInput,
  CadesSignatureOutput,
  DerSigningTime,
} from '../dtos/cades';
import { replacePemNewLines } from '../../utils/util';

const signCadesRsa = (input: CadesSignatureInput): CadesSignatureOutput => {
  const date = new KJUR.asn1.DERUTCTime({
    date: new Date(input.created),
  }) as DerSigningTime;

  const param = {
    version: 1,
    hashalgs: [constants.HashAlg.SHA256],
    econtent: {
      type: 'data',
      content: { hex: input.data },
    },
    certs: [input.pemCert],
    sinfos: [
      {
        version: 1,
        id: { type: 'isssn', cert: input.pemCert },
        hashalg: constants.HashAlg.SHA256,
        sattrs: {
          array: [
            {
              attr: 'contentType',
              type: 'data',
            },
            {
              attr: 'signingTime',
              str: date.s,
            },
            {
              attr: 'messageDigest',
              hex: input.data,
            },
            {
              attr: 'signingCertificateV2',
              array: [input.pemCert],
            },
          ],
        },
        sigalg: constants.HashAlgKeyType.SHA256_RSA,
        signkey: input.pemPrivKey,
      },
    ],
  };

  const signedData = new KJUR.asn1.cms.SignedData(param);
  const hexSignedData = signedData.getContentInfoEncodedHex();
  const pemSignedData = KJUR.asn1.ASN1Util.getPEMStringFromHex(
    hexSignedData,
    'PKCS7',
  );
  const cadesOuput: CadesSignatureOutput = {
    cades: replacePemNewLines(pemSignedData, 'PKCS7'),
    verificationMethod: input.pemCert,
    signingTime: input.created,
  };
  return cadesOuput;
};




export { signCadesRsa };
