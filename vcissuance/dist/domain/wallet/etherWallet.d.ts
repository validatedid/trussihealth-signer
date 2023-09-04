import { EnterpriseWallet } from './enterpriseWallet';
import EtherBaseWallet from './etherBaseWallet';
export default class EtherWallet extends EtherBaseWallet {
    static create(): Promise<EnterpriseWallet>;
}
