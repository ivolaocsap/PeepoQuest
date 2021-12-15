import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BinanceContract } from './BinanceContract';

type Abi = any[];

export abstract class ContractWrapper {
  protected _contract: BinanceContract;

  constructor(
    protected abi: Abi,
    private _address: string,
    protected signerOrProvider: Signer | Provider,
  ) {
    this._contract = new BinanceContract(_address, abi, signerOrProvider);
  }

  connect(signer: Signer | Provider) {
    if (this.contract) {
      this._contract = this.contract.connect(signer) as BinanceContract;
    } else {
      this._contract = new BinanceContract(this._address, this.abi, signer);
    }
  }

  get address() {
    return this._address;
  }

  get contract() {
    return this._contract;
  }
}
