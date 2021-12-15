import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { ContractWrapper } from "./ContractWrapper";

export class TaxService extends ContractWrapper {
  constructor(abi: any[], address: string, signer: Signer | Provider) {
    super(abi, address, signer);
  }
}
