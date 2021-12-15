import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { LottoInfo } from 'src/diamondhand/Lottery';
import useDiamondHand from 'src/hooks/useDiamondHand';
import { useBlockNumber } from 'src/state/application/hooks';

const Context = createContext<LottoInfo>(null);

export const CurrentLotteryInfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<LottoInfo>({} as LottoInfo);
  const diamondHand = useDiamondHand();
  const blockNumber = useBlockNumber();
  const lastCheckedBlockNumber = useRef<number>();

  useEffect(() => {
    let mounted = true;
    if (!diamondHand) {
      return;
    }

    if (lastCheckedBlockNumber.current > blockNumber - 5) {
      return;
    }

    return () => {
      mounted = false;
    };
  }, [blockNumber, diamondHand]);

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useCurrentLotto = (): LottoInfo => {
  return useContext(Context);
};
