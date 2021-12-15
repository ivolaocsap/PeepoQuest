import { useEffect, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { useWeb3React } from '@web3-react/core';
import useDiamondHand from './useDiamondHand';

const useMyTicket = (battleId: BigNumber) => {
  const dh = useDiamondHand();
  const [usercharacter, setMyChar] = useState<number>();
  const [player1, setPlayer1] = useState<string>();
  const [player2, setPlayer2] = useState<string>();
  const [vitalPoints1, setvitalPoints1] = useState<BigNumber>();
  const [vitalPoints2, setvitalPoints2] = useState<BigNumber>();
  const [atackForce1, setAtackForce1] = useState<BigNumber>();
  const [atackForce2, setAtackForce2] = useState<BigNumber>();
  const [battlestarted, setBattlestarted] = useState<boolean>();
  const [battlefinished, setBattlefinished] = useState<boolean>();
  const { account } = useWeb3React();

  useEffect(() => {
    let mounted = true;
    if (!dh || !account || !battleId) {
      return;
    }
    setMyChar(0);
    dh.NFT.UserCharacter(account).then((usercharacter) => {
      if (!mounted) {
        return;
      }
      setMyChar(usercharacter);
    });

    dh.NFT.getPlayer1(battleId).then((player1) => {
      if (!mounted) {
        return;
      }
      setPlayer1(player1);
    });
    dh.NFT.getPlayer2(battleId).then((player2) => {
      if (!mounted) {
        return;
      }
      setPlayer2(player2);
    });
    dh.NFT.BattleStarted(battleId).then((battlestarted) => {
      if (!mounted) {
        return;
      }
      setBattlestarted(battlestarted);
    });
    dh.NFT.BattleEnded(battleId).then((battlefinished) => {
      if (!mounted) {
        return;
      }
      setBattlefinished(battlefinished);
    });

    return () => {
      mounted = false;
    };
  }, [dh, battleId, player1, account]);
  const data = {
    usercharacter: usercharacter,
    player1: player1,
    player2: player2,
    battlestarted: battlestarted,
    battlefinished: battlefinished,
  };
  return data;
};

export default useMyTicket;
