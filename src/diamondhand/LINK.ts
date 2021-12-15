import { Provider } from '@ethersproject/providers';
import { Signer } from '@ethersproject/abstract-signer';
import ERC20 from './ERC20';

class LINK extends ERC20 {
  constructor(abi: any[], address: string, provider: Signer | Provider, symbol: string) {
    super(address, provider, symbol, 18, abi);
  }
}
export default LINK;
