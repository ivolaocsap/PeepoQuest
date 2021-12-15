import { useContext } from 'react';
import { Context, EthProviderContext } from './ConnectionProvider';

export { ConnectionProvider as default } from './ConnectionProvider';
export const useConnection = () => useContext(Context);

/**
 * Get default (anonymous) web3 provider
 * @returns
 */
export const useEthProvider = () => useContext(EthProviderContext);
