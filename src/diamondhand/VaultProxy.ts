import { ContractWrapper } from './ContractWrapper';

export class VaultProxy extends ContractWrapper {
  async vaultBalance(asset: string) {
    return await this.contract.vaultBalance(asset);
  }
}
