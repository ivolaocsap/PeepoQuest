import { useEffect, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import useDiamondHand from './useDiamondHand';

export type Ticket = {
  id: BigNumber;
  numbers: number[];
};

const useMyTicketNumber = (ticketIds: BigNumber[]) => {
  const dh = useDiamondHand();
  const [tickets, setTickets] = useState<Ticket[]>(undefined);

  useEffect(() => {
    let mounted = true;
    if (!dh || !ticketIds) {
      return;
    }
    setTickets([]);
    dh.TICKET.getListTicketNumbers(ticketIds).then((res) => {
      if (mounted) {
        setTickets(res);
      }
    });

    return () => {
      mounted = false;
    };
  }, [dh, ticketIds]);

  return tickets;
};

export default useMyTicketNumber;
