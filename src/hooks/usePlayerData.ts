import { useEffect, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { useWeb3React } from '@web3-react/core';
import useDiamondHand from './useDiamondHand';

const usePlayerData = (battleId: BigNumber, one: string, two: string) => {
  const dh = useDiamondHand();

  const [vitalPoints1, setvitalPoints1] = useState<BigNumber>();
  const [vitalPoints2, setvitalPoints2] = useState<BigNumber>();
  const [atackForce1, setAtackForce1] = useState<BigNumber>();
  const [atackForce2, setAtackForce2] = useState<BigNumber>();
  const [char1, setMyChar1] = useState<number>();
  const [char2, setMyChar2] = useState<number>();

  const { account } = useWeb3React();

  useEffect(() => {
    let mounted = true;
    if (!dh || !account || !one || !two) {
      console.log(two);
      return;
    }
    dh.NFT.playerVital(battleId, one).then((vitalPoints1) => {
      if (!mounted) {
        return;
      }
      setvitalPoints1(vitalPoints1);
    });
    dh.NFT.playerVital(battleId, two).then((vitalPoints2) => {
      if (!mounted) {
        return;
      }
      setvitalPoints2(vitalPoints2);
    });

    dh.NFT.playerAtack(battleId, one, two).then((atackForce1) => {
      if (!mounted) {
        return;
      }
      setAtackForce1(atackForce1);
    });
    dh.NFT.playerAtack(battleId, two, one).then((atackForce2) => {
      if (!mounted) {
        return;
      }
      setAtackForce2(atackForce2);
    });
    dh.NFT.UserCharacter(one).then((usercharacter) => {
      if (!mounted) {
        return;
      }
      setMyChar1(usercharacter);
    });
    dh.NFT.UserCharacter(two).then((usercharacter) => {
      if (!mounted) {
        return;
      }
      setMyChar2(usercharacter);
    });

    return () => {
      mounted = false;
    };
  }, [dh, battleId, one, account]);
  const data = {
    vitalPoints1: vitalPoints1,
    vitalPoints2: vitalPoints2,
    atackForce1: atackForce1,
    atackForce2: atackForce2,
    char1: char1,
    char2: char2,
  };
  return data;
};

export default usePlayerData;
