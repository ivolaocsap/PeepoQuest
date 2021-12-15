import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber } from '@ethersproject/bignumber';
import { ContractWrapper } from './ContractWrapper';

export class Nft extends ContractWrapper {
  constructor(abi: any[], address: string, signer: Signer | Provider) {
    super(abi, address, signer);
  }

  async mint(user: string, Id: number, _value: BigNumber) {
    return await this.contract.mint(user, Id, _value);
  }
  async player1join(Id: BigNumber) {
    return await this.contract.player1join(Id);
  }
  async player2join(Id: BigNumber) {
    return await this.contract.player2join(Id);
  }
  async startbattle(Id: BigNumber) {
    return await this.contract.startbattle(Id);
  }
  async player1atack(Id: BigNumber) {
    return await this.contract.player1atack(Id);
  }
  async player2atack(Id: BigNumber) {
    return await this.contract.player2atack(Id);
  }

  async UserCharacter(user: string): Promise<number> {
    return await this.contract.UserCharacter(user);
  }
  async getBattleid(): Promise<BigNumber> {
    return await this.contract.currBattle_id();
  }
  async BattleStarted(id: BigNumber): Promise<boolean> {
    return await this.contract.btl_HasStarted(id);
  }
  async BattleEnded(id: BigNumber): Promise<boolean> {
    return await this.contract.btl_HasFinished(id);
  }
  async getPlayer1(id: BigNumber): Promise<string> {
    return await this.contract.player1(id);
  }
  async getPlayer2(id: BigNumber): Promise<string> {
    return await this.contract.player2(id);
  }
  async playerVital(id: BigNumber, player: string): Promise<BigNumber> {
    return await this.contract.playerVital(id, player);
  }
  async playerAtack(id: BigNumber, atacker: string, defenser: string): Promise<BigNumber> {
    return await this.contract.atackCalculator(id, atacker, defenser);
  }
}
