import { Injectable } from '@nestjs/common';
import { EntityData, KeyData } from '../dtos/wallet';
import {
  ENTITY_DID,
  ENTITY_NAME,
  WALLET_PRIVATE_KEY,
} from '../config';

@Injectable()
export default class KeyPairsRepository {
  findEntityDataByDid = async (key: string): Promise<EntityData> => {
    const keyData: KeyData = {
      key: WALLET_PRIVATE_KEY,
    };
    return {
      did: ENTITY_DID,
      data: keyData,
      name: ENTITY_NAME,
    };
  };
}
