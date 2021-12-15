import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import fromUnixTime from 'date-fns/fromUnixTime';
import { ContractWrapper } from './ContractWrapper';
import { DiamondHand } from './DiamondHand';

export type LottoInfo = {
  info: {
    lotteryId: number;
    lotteryStatus: LotteryStatus;
    prizePool: BigNumber;
    costPerTicket: BigNumber;
    prizeDistribution: number[];
    startingTimestamp: Date;
    closingTimestamp: Date;
    winningNumbers: number[];
    winners: BigNumber[];
    numberOfTickets: BigNumber;
  };
  prizes: BigNumber[];
  maxValidRange: number;
  powerBallRange: number;
};
export class Lottery extends ContractWrapper {
  constructor(
    abi: any[],
    address: string,
    signer: Signer | Provider,
    private diamondHand: DiamondHand,
  ) {
    super(abi, address, signer);
  }

  async getCurrentLottoInfo() {
    const [[lotto], [prizes], [maxValidRange], [powerBallRange]] =
      await this.diamondHand.multicall([
        {
          contract: this.contract,
          method: 'getCurrentLotto',
        },
        {
          contract: this.contract,
          method: 'getCurrentPrizes',
        },
        {
          contract: this.contract,
          method: 'maxValidRange_',
        },
        {
          contract: this.contract,
          method: 'powerBallRange_',
        },
      ]);

    if (!lotto) {
      return {} as LottoInfo;
    }

    const numberOfTickets = await this.diamondHand.TICKET.getNumberOfTickets(lotto[0]);

    return {
      info: {
        lotteryId: lotto[0].toNumber(),
        lotteryStatus: lotto[1],
        prizePool: lotto[2],
        costPerTicket: lotto[3],
        prizeDistribution: lotto[4].map((t: BigNumber) => t.toNumber()),
        startingTimestamp: fromUnixTime(lotto[5].toNumber()),
        closingTimestamp: fromUnixTime(lotto[6].toNumber()),
        winningNumbers: lotto[7],
        winners: lotto[8],
        numberOfTickets,
      },
      prizes,
      maxValidRange,
      powerBallRange,
    } as LottoInfo;
  }

  async getCurrentLotto() {
    return await this.contract.getCurrentLotto();
  }

  getBasicLottoInfo(lotteryId: number) {
    return this.contract.getBasicLottoInfo(BigNumber.from(lotteryId)).then((data: any) => {
      const prizes = data?.prizeDistribution?.map((prize: BigNumber) =>
        data?.prizePool?.mul(prize).div(1e6),
      );
      return { ...data, prizes };
    });
  }

  async getCurrentPrizes() {
    return await this.contract.getCurrentPrizes();
  }

  async getCostPerTicket() {
    return await this.contract.costPerTicket_();
  }

  async getCurrentTotalPrize() {
    return await this.contract.getCurrentTotalPrize();
  }

  async autoStartLotto() {
    return await this.contract.safeCall.autoStartLotto();
  }

  async manualStartLotto(startingTime: number, closingTime: number) {
    return await this.contract.safeCall.manualStartLotto(startingTime, closingTime);
  }

  async drawWinningNumbers(lotteryId: number) {
    return await this.contract.safeCall.drawWinningNumbers(lotteryId);
  }

  async batchBuyLottoTicket(
    lotteryId: BigNumberish,
    numberOfTickets: number,
    chosenNumbersForEachTicket: number[],
  ) {
    return await this.contract.safeCall.batchBuyLottoTicket(
      lotteryId,
      numberOfTickets,
      chosenNumbersForEachTicket,
    );
  }

  async batchClaimRewards(lotteryId: BigNumber, tokenIds: BigNumber[]) {
    return await this.contract.safeCall.batchClaimRewards(lotteryId, tokenIds);
  }

  async maxValidRange() {
    return await this.contract.maxValidRange_();
  }

  async powerBallRange() {
    return await this.contract.powerBallRange_();
  }
}

export type LotteryInfo = {
  lotteryId: BigNumber;
  lotteryStatus: number;
  prizePool: BigNumber;
  costPerTicket: BigNumber;
  prizeDistribution: BigNumber[];
  startingTimestamp: BigNumber;
  closingTimestamp: BigNumber;
  winningNumbers: number[];
  winners: BigNumber[];
  numberOfTickets?: BigNumber;
  prizes?: BigNumber[];
};

export enum LotteryStatus {
  NotStarted, // The lottery has not started yet
  Open, // The lottery is open for ticket purchases
  Closed, // The lottery is no longer open for ticket purchases
  Completed, // The numbers drawn
}
