import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes';
import * as bodyParser from 'body-parser';
import AppModule from './app.module';
import { API_NAME, MAX_REQUEST_BODY_SIZE, ESEAL_SERVICE } from './config';
import {PRINT_INFO} from "./modules/eidasBridge/utils/printer";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json({ limit: MAX_REQUEST_BODY_SIZE }));

  await app.listen(ESEAL_SERVICE.PORT, '0.0.0.0', () => {
    PRINT_INFO(
      `Server ${API_NAME} running on port ${ESEAL_SERVICE.PORT}`,
    );
  });
}
bootstrap().then(
  () => {},
  () => {},
);
