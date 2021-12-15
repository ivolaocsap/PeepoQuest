import { Deployments } from './deployments';

export type Configuration = {
  chainId: number;
  etherscanUrl: string;
  defaultProvider: string | string[];
  deployments: Deployments;
  externalTokens?: { [contractName: string]: [string, number] };
  config?: EthereumConfig;
  pollingInterval?: number;
  refreshInterval?: number;
  maxBalanceRefresh?: number;
  maxUnclaimedRefresh?: number;
  defaultSlippageTolerance?: number;
  gasLimitMultiplier?: number;
  backendUrl?: string;
  backendDisabled?: boolean;
  abis: {
    Lottery?: any[];
    Ticket?: any[];
    Nft?: any[];
    PeepoQuest?: any[];
    Mim?: any[];
    Link?: any[];
    MasterChef?: any[];
    TaxService?: any[];
  };
  addresses: {
    Lottery?: string;
    Ticket?: string;
    PeepoQuest?: string;
    Mim?: string;
    Link?: string;
    Nft?: string;
    MasterChef?: string;
    Multicall?: string;
    PrizeReservePool?: string;
    RandomNumberGenerator?: string;
    TaxService?: string;
  };
  admins: string[];
  collateralTokens: { [contractName: string]: [string, number] };
};

export type EthereumConfig = {
  testing: boolean;
  autoGasMultiplier: number;
  defaultConfirmations: number;
  defaultGas: string;
  defaultGasPrice: string;
  ethereumNodeTimeout: number;
};

export const defaultEthereumConfig = {
  testing: false,
  autoGasMultiplier: 1.5,
  defaultConfirmations: 1,
  defaultGas: '6000000',
  defaultGasPrice: '1000000000000',
  ethereumNodeTimeout: 10000,
};
