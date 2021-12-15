import { BigNumber } from 'ethers';

export interface VSwapPoolToken {
  address: string;
  decimals: number;
  ratio: number;
  symbol: string;
}

export interface VSwapRewardToken {
  address: string;
  symbol: string;
}

export interface VSwapReward {
  rewardPerBlock: number;
}

export interface VSwapROI {
  apy: number;
}

export interface VSwapStakeToken {
  address: string;
  decimals: number;
  symbol: string;
  price: number;
}

export interface VSwapUnverifiedPoolData {
  contractAddress: string;
  poolTokens: VSwapPoolToken[];
  stakeToken: VSwapStakeToken;
  rewardTokens: VSwapRewardToken[];
  rewards: { [key: string]: VSwapReward };
  roi: VSwapROI;
  totalSupply: number;
  totalSupplyUSD: number;
}

export interface StakePoolInfo {
  token1?: string;
  token2?: string;
  token3?: string;
  stable?: boolean;
  locked?: number;
  vesting?: boolean;
  token1Percentage?: number;
  lpToken?: string;
  lpTokenPrice?: number;
  earnedToken?: string;
  poolAddress?: string;
  data: VSwapUnverifiedPoolData;
}

export type ConfigurationInfo = {
  jackPotDistribution?: number;
  matchFourDistribution?: number;
  matchThreeDistribution?: number;
  costPerTicket?: BigNumber;
  taxRate?: BigNumber;
  maxValidRange?: number;
  powerBallRange?: number;
  burnironRatio?: BigNumber;
  reservePoolRatio?: BigNumber;
  revervePoolBalance?: BigNumber;
  randomNumberGeneratorBalance?: BigNumber;
  zapBalance?: BigNumber;
};
