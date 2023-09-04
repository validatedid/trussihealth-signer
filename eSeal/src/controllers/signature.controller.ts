import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SignPayload } from '../modules/eidasBridge/domain/dtos/eidas';
import SignatureService from '../modules/eidasBridge/services/signatureService/signatureService';
import { ESEAL_SERVICE } from '../config';

@Controller(ESEAL_SERVICE.BASE_PATH.EIDAS_BRIDGE)
export default class SigntaureController {
  constructor(private signatureService: SignatureService) {}

  // @ts-ignore
  @Post(`${ESEAL_SERVICE.ENDPOINTS.SIGNATURE_CREATION}`)
  async eSeal(
    @Body() body: SignPayload,
    @Res() res: Response,
  ): Promise<void> {
    const { verifiableCredential } = await this.signatureService.execute({
      signPayload: body,
    });
    res.status(HttpStatus.CREATED).json(verifiableCredential);
  }
}
