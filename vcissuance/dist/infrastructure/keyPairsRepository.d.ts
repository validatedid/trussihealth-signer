import { EntityData } from '../dtos/wallet';
export default class KeyPairsRepository {
    findEntityDataByDid: (key: string) => Promise<EntityData>;
}
