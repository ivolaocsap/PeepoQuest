import { useWeb3React } from '@web3-react/core';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import DiamondHand from '../../diamondhand';
import { useConfiguration } from '../ConfigProvider/ConfigProvider';

export interface DiamondHandContext {
  diamondHand?: DiamondHand;
}

export const Context = createContext<DiamondHandContext>({
  diamondHand: null,
});

export const DiamondHandProvider: React.FC = ({ children }) => {
  const { account, library } = useWeb3React();
  const config = useConfiguration();
  const [diamondHand, setDiamondHand] = useState<DiamondHand>();

  useEffect(() => {
    if (!library || !config) {
      return;
    }
    setDiamondHand(new DiamondHand(config, library, account));
  }, [library, account, config]);

  const value = useMemo(() => {
    return { diamondHand };
  }, [diamondHand]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
