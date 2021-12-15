import { JsonRpcProvider } from '@ethersproject/providers';
import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { getDefaultConfiguration } from '../../config';
import { getDefaultProvider } from '../../utils/provider';

export interface ConnectionContext {
  networkStatus?: NetworkStatus;
  connected: boolean;
  chainId?: number;
}

export enum NetworkStatus {
  INITIALIZE = 0,
  READY = 10,
  WRONG = -1,
}

export const Context = createContext<ConnectionContext>({
  connected: false,
});

export const EthProviderContext = createContext<JsonRpcProvider>(null);

export const ConnectionProvider: React.FC = ({ children }) => {
  const providerRef = useRef<JsonRpcProvider>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeoutRef = useRef<any>();
  const [value, setValue] = useState<ConnectionContext>({
    connected: false,
    networkStatus: NetworkStatus.INITIALIZE,
  });

  const connect = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (providerRef.current) {
      window.location.reload();
    }
    const config = getDefaultConfiguration();
    if (config == null) {
      setValue({
        networkStatus: NetworkStatus.WRONG,
        connected: true,
        chainId: config.chainId,
      });
      return;
    }

    providerRef.current = getDefaultProvider();
    providerRef.current?.ready.then((net) => {
      setValue({
        networkStatus: NetworkStatus.READY,
        chainId: net.chainId,
        connected: true,
      });
    });
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', connect);
      timeoutRef.current = setTimeout(connect, 100);
      return () => window.ethereum.removeListener('chainChanged', connect);
    }

    connect();
  }, [connect]);

  return (
    <Context.Provider value={value}>
      <EthProviderContext.Provider value={providerRef.current}>
        {children}
      </EthProviderContext.Provider>
    </Context.Provider>
  );
};
