import { Module } from '@nestjs/common';
import EidasBridgeModule from './modules/eidasBridge/eidasBridgeModule';

@Module({
  imports: [
    EidasBridgeModule,
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}
