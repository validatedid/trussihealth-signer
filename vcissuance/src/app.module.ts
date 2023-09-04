import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import VerifiableCredentialCreator from './services/verifiableCredentialCreator';
import SignatureCreator from './services/signatureCreator';
import VerifiableCredentialPayloadCreator from './services/verifiableCredentialPayloadCreator';
import KeyPairsRepository from './infrastructure/keyPairsRepository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    VerifiableCredentialPayloadCreator,
    VerifiableCredentialCreator,
    SignatureCreator,
    KeyPairsRepository,
  ],
})
export class AppModule {}
