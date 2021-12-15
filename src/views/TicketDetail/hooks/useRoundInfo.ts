import { useEffect, useState } from 'react';
import { LotteryInfo } from 'src/diamondhand/Lottery';
import { BigNumber } from '@ethersproject/bignumber';
import useDiamondHand from 'src/hooks/useDiamondHand';

const useRoundInfo = (lotteryId?: number) => {
  const dh = useDiamondHand();
  const [lotteryInfo, setLotteryInfo] = useState<LotteryInfo>(undefined);

  useEffect(() => {
    let mounted = true;
    if (!dh || !lotteryId || lotteryId === 0) {
      return;
    }
    Promise.all([
      dh?.LOTTERY.getBasicLottoInfo(lotteryId),
      dh?.TICKET.getNumberOfTickets(BigNumber.from(lotteryId)),
    ]).then(([lottoRawInfo, numberOfTickets]) => {
      if (!mounted) {
        return;
      }
      setLotteryInfo({
        lotteryId: lottoRawInfo.lotteryID,
        lotteryStatus: lottoRawInfo.lotteryStatus,
        prizePool: lottoRawInfo.prizePool,
        costPerTicket: lottoRawInfo.costPerTicket,
        prizeDistribution: lottoRawInfo.prizeDistribution,
        startingTimestamp: lottoRawInfo.startingTimestamp,
        closingTimestamp: lottoRawInfo.closingTimestamp,
        winningNumbers: lottoRawInfo.winningNumbers,
        winners: lottoRawInfo.winners,
        numberOfTickets,
        prizes: lottoRawInfo.prizes,
      });
    });
    return () => {
      mounted = false;
    };
  }, [dh, lotteryId]);

  return lotteryInfo;
};

export default useRoundInfo;
