import { useEffect, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { useWeb3React } from '@web3-react/core';
import useDiamondHand from './useDiamondHand';

const useMyTicket = (lotteryId: number) => {
  const dh = useDiamondHand();
  const [myTickets, setMyTickets] = useState<BigNumber[]>([]);
  const { account } = useWeb3React();

  useEffect(() => {
    let mounted = true;
    if (!dh || !lotteryId || !account) {
      return;
    }
    setMyTickets([]);
    dh.TICKET.getUserTickets(lotteryId, account).then((ticketIds) => {
      if (!mounted) {
        return;
      }
      setMyTickets(ticketIds);
    });
    return () => {
      mounted = false;
    };
  }, [dh, lotteryId, account]);

  return myTickets;
};

export default useMyTicket;
