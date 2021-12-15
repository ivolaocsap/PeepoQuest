import { Configuration } from './diamondhand/config';
import deploymentMainnet from './diamondhand/deployments/deployments.mainnet.json';

const configurations: { [env: string]: Configuration } = {
  mainnet: {
    chainId: 43114,
    etherscanUrl: 'https://snowtrace.io/',
    defaultProvider: 'https://api.avax.network/ext/bc/C/rpc',
    deployments: deploymentMainnet,
    pollingInterval: 5 * 1000,
    refreshInterval: 10 * 1000,
    defaultSlippageTolerance: 0.01,
    gasLimitMultiplier: 1.2,
    maxBalanceRefresh: 1000000,
    abis: {
      Lottery: deploymentMainnet.Lottery.abi,
      Ticket: deploymentMainnet.Ticket.abi,
      TaxService: deploymentMainnet.TaxService.abi,
      MasterChef: deploymentMainnet.MasterChef.abi,
      Nft: deploymentMainnet.Nft.abi,
    },
    addresses: {
      Lottery: deploymentMainnet.Lottery.address,
      Ticket: deploymentMainnet.Ticket.address,
      MasterChef: deploymentMainnet.MasterChef.address,
      Nft: deploymentMainnet.Nft.address,
      PeepoQuest: '0x93eb60431E74C328ACE4E5dAC89B9e45554104f3',
      Mim: '0x130966628846BFd36ff31a822705796e8cb8C18D',
      Link: '0xb0897686c545045aFc77CF20eC7A532E3120E0F1',
      Multicall: '0xa00FB557AA68d2e98A830642DBbFA534E8512E5f',
      TaxService: deploymentMainnet.TaxService.address,
      RandomNumberGenerator: deploymentMainnet.RandomNumberGenerator.address,
      PrizeReservePool: deploymentMainnet.PrizeReservePool.address,
    },

    admins: ['0x2DcE12B0bCcf938CD6ee6F3bF872746e5D8F3e92'],
    collateralTokens: {
      PeepoQuest: ['0x2dA59E679529d3c04DAD1DfF038cabdB5Dcd8560', 18],
    },
  },
};

export const ExternalLinks = {
  twitter: 'https://twitter.com/PeepoQuest',
  codes: 'https://github.com/PeepoQuest',
  discord: 'https://discord.gg/PeepoQuest',
  medium: 'https://medium.com/@PeepoQuest',
  telegram: 'https://t.me/PeepoQuest',
  buyPeepoQuest:
    'https://app.sushi.com/swap?outputCurrency=0x2dA59E679529d3c04DAD1DfF038cabdB5Dcd8560',
  rules: 'https://docs.PeepoQuest.finance/products/',
};

const env: string = process.env.REACT_APP_ENV || process.env.NODE_ENV || 'development';

export const getDefaultConfiguration = () => {
  // config used when no ethereum detected
  return configurations[env];
};
