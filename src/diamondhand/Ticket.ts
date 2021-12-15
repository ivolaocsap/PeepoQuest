import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber } from '@ethersproject/bignumber';
import { ContractWrapper } from './ContractWrapper';

export class Ticket extends ContractWrapper {
  constructor(abi: any[], address: string, signer: Signer | Provider) {
    super(abi, address, signer);
  }

  async getUserTickets(lotteryId: number, userId: string) {
    return await this.contract.getUserTickets(BigNumber.from(lotteryId), userId);
  }

  async getListTicketNumbers(ticketIds: BigNumber[]) {
    const [ticketNumbers, sizeOfLottery] = await this.contract.getListTicketNumbers(ticketIds);
    return ticketIds.map((id, index) => {
      return {
        id,
        numbers: ticketNumbers
          .slice(sizeOfLottery * index, (index + 1) * sizeOfLottery)
          .map((t: BigNumber) => t.toNumber()),
      };
    });
  }

  async getTicketClaimStatuses(ticketIds: BigNumber[]) {
    const ticketStatuses = await this.contract.getTicketClaimStatuses(ticketIds);
    return ticketIds.map((id, index) => {
      return {
        id,
        claimed: ticketStatuses[index],
      };
    });
  }

  async getTicketNumbers(id: number) {
    return await this.contract.getTicketNumbers(BigNumber.from(id));
  }

  async getNumberOfTickets(lotteryId: BigNumber) {
    return await this.contract.getNumberOfTickets(lotteryId);
  }
}

export type TicketInfo = {
  owner: string;
  numbers: BigNumber[];
  claimed: boolean;
  lotteryId: BigNumber;
};
