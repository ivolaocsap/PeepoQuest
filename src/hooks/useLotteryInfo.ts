import { useEffect, useRef, useState } from 'react';
import { LotteryInfo } from 'src/diamondhand/Lottery';
import useDiamondHand from './useDiamondHand';
import { useBlockNumber } from 'src/state/application/hooks';

const useLotteryInfo = (lotteryId?: number, skipWaitBlock?: boolean) => {
  const dh = useDiamondHand();
  const [lotteryInfo, setLotteryInfo] = useState<LotteryInfo>(undefined);

  const blockNumber = useBlockNumber();
  const lastCheckedBlockNumber = useRef<number>();

  useEffect(() => {
    let mounted = true;
    if (!dh || !lotteryId || lotteryId === 0) {
      return;
    }
    if (!skipWaitBlock && lastCheckedBlockNumber.current > blockNumber - 5) {
      return;
    }
    dh?.LOTTERY.getBasicLottoInfo(lotteryId).then((lottoRawInfo: any) => {
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
        prizes: lottoRawInfo.prizes,
      });
    });
    lastCheckedBlockNumber.current = blockNumber;
    return () => {
      mounted = false;
    };
  }, [blockNumber, dh, lotteryId, skipWaitBlock]);

  return lotteryInfo;
};

export default useLotteryInfo;
