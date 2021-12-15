import { JsonRpcProvider } from '@ethersproject/providers';
import { getDefaultConfiguration } from 'src/config';
import { web3ProviderFrom } from 'src/diamondhand/ether-utils';

export function getDefaultProvider(): JsonRpcProvider {
  const config = getDefaultConfiguration();
  let url: string;

  if (Array.isArray(config.defaultProvider)) {
    const randomIndex = Math.floor(Math.random() * config.defaultProvider.length);
    url = config.defaultProvider[randomIndex];
  } else {
    url = config.defaultProvider;
  }
  const provider = web3ProviderFrom(url);

  provider.pollingInterval = config.pollingInterval || 10000;
  return provider;
}
