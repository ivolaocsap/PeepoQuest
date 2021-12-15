import { nullFormat } from 'numeral';
import React, { createContext, ReactNode, useContext } from 'react';
import { getDefaultConfiguration } from '../../config';
import { Configuration } from '../../diamondhand/config';

const Context = createContext<Configuration>({} as Configuration);
const networkConfig = getDefaultConfiguration();

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <Context.Provider value={networkConfig}>{children}</Context.Provider>;
};

export const useConfiguration = (): Configuration => {
  const networkConfig = getDefaultConfiguration();

  return networkConfig;
};
