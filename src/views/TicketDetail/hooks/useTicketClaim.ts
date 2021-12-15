import { BigNumber } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import useDiamondHand from 'src/hooks/useDiamondHand';

type TicketClaimStatus = {
  id: BigNumber;
  claimed: boolean;
};
const useTicketClaim = (ticketIds: BigNumber[]) => {
  const dh = useDiamondHand();
  const [isCanClaimReward, setIsCanClaimReward] = useState<boolean>(false);
  const [claimStatuses, setClaimStatuses] = useState<TicketClaimStatus[]>([]);

  const getTicketClaimStatus = useCallback(() => {
    if (!dh || !ticketIds) return;
    dh?.TICKET?.getTicketClaimStatuses(ticketIds).then((ticketStatuses: any[]) => {
      const statuses = ticketIds?.map((t, index) => {
        return {
          id: t,
          claimed: ticketStatuses[index]?.claimed,
        };
      });
      setClaimStatuses(statuses);
      setIsCanClaimReward(ticketStatuses?.map((s) => s?.claimed)?.includes(false));
    });
  }, [dh, ticketIds]);

  useEffect(() => {
    getTicketClaimStatus();
  }, [getTicketClaimStatus]);

  return { isCanClaimReward, claimStatuses, getTicketClaimStatus };
};

export default useTicketClaim;
