import { useCallback } from 'react';
import useDiamondHand from './useDiamondHand';
import { Call } from 'src/diamondhand/multicall';

const useMulticall = () => {
  const dh = useDiamondHand();

  const multicall = useCallback(
    async (calls: Call[]) => {
      if (!dh?.multicall) {
        return;
      }
      return await dh.multicall(calls);
    },
    [dh],
  );

  return multicall;
};

export default useMulticall;
