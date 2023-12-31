import { pki, pkcs12, asn1, util } from 'node-forge';

const getKeyFromP12 = (p12: pkcs12.Pkcs12Pfx): string => {
  const keyData = p12.getBags({ bagType: pki.oids.pkcs8ShroudedKeyBag });
  let pkcs8Key = keyData[pki.oids.pkcs8ShroudedKeyBag][0];

  if (typeof pkcs8Key === 'undefined') {
    // eslint-disable-next-line prefer-destructuring
    pkcs8Key = keyData[pki.oids.keyBag][0];
  }

  if (typeof pkcs8Key === 'undefined') {
    throw new Error('Unable to get private key.');
  }

  return pki.privateKeyToPem(pkcs8Key.key).replace(/\r\n/g, '');
};

const getCertificateFromP12 = (
  p12: pkcs12.Pkcs12Pfx,
): { pemCertificate: string[] } => {
  const certData = p12.getBags({ bagType: pki.oids.certBag });

  /*
  const pemCertificate = certData[pki.oids.certBag].map((certificate) =>
    pki.certificateToPem(certificate.cert).replace(/\r\n/g, "")
  );
  */
  const pemCertificate = certData[pki.oids.certBag].map((certificate) =>
    pki.certificateToPem(certificate.cert),
  );

  return { pemCertificate };
};

const convertToPem = (
  p12Buff: Buffer,
  password: string,
): { pemKey: string; pemCertificate: string[] } => {
  const strBuff = util.createBuffer(p12Buff);
  const p12Asn1 = asn1.fromDer(strBuff);

  const p12 = pkcs12.pkcs12FromAsn1(p12Asn1, false, password);
  // console.warn(JSON.stringify(p12, null, 2));
  const pemKey = getKeyFromP12(p12);
  const { pemCertificate } = getCertificateFromP12(p12);
  // console.warn(pemCertificate);

  return { pemKey, pemCertificate };
};

const parseP12File = (
  p12File: Buffer,
  password: string,
): { pemCert: string[]; pemPrivateKey: string } => {
  const result = convertToPem(p12File, password);
  return { pemCert: result.pemCertificate, pemPrivateKey: result.pemKey };
};

const getPemPublicKeyfromPemCert = (pemCert: string): string => {
  const cert = pki.certificateFromPem(pemCert);
  return pki.publicKeyToPem(cert.publicKey);
};

export { parseP12File, getPemPublicKeyfromPemCert };
