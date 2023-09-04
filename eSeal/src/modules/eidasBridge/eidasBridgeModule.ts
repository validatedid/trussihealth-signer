import { Module } from '@nestjs/common';
import SigntaureController from '../../controllers/signature.controller';
import SignatureService from './services/signatureService/signatureService';
import CertificatesRepository from './repository/certificatesRepository';
import DigitalSignatureService from './repository/digitalSignatureService';


@Module({
  imports: [],
  controllers: [
    SigntaureController,
  ],
  providers: [
    SignatureService,
    CertificatesRepository,
    DigitalSignatureService,
  ],
})
export default class EidasBridgeModule {}
