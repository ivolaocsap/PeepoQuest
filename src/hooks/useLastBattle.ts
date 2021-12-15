import { useEffect, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { useWeb3React } from '@web3-react/core';
import useDiamondHand from './useDiamondHand';

const useMyTicket = () => {
  const dh = useDiamondHand();
  const [currentBattle, setbattle] = useState<BigNumber>();

  const { account } = useWeb3React();

  useEffect(() => {
    let mounted = true;
    if (!dh || !account) {
      return;
    }
    setbattle(BigNumber.from(0));
    dh.NFT.getBattleid().then((battle) => {
      if (!mounted) {
        return;
      }
      setbattle(battle);
    });

    return () => {
      mounted = false;
    };
  }, [dh, account]);

  return currentBattle;
};

export default useMyTicket;
