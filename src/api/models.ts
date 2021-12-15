import { toPair } from 'src/utils/objects';

export type TokenType = 'dollar' | 'share';
export type StatisticType = 'price' | 'supply' | 'marketcap';

export const getStasticTypeDisplayName = (type: StatisticType) => {
  return {
    price: 'Price',
    supply: 'Supply',
    marketcap: 'Marketcap',
  }[type];
};

export const TokenSymbols = {
  dollar: 'PeepoQuest',
  share: 'STEEL',
};

export type Measurement = 'diamond_price_bnb' | 'diamond_price_usd';

export const MeasurementDisplay: Record<Measurement, string> = {
  diamond_price_usd: 'DND/USD price',
  diamond_price_bnb: 'DND/BNB price',
};

export type Period = 'lastDay' | 'lastWeek' | 'lastMonth' | 'lastYear' | 'allTime';

export const PeriodDisplay: Record<Period, string> = {
  lastDay: 'Last day',
  lastWeek: 'Last week',
  lastMonth: 'Last month',
  lastYear: 'Last year',
  allTime: 'All time',
};

export const AllPeriods = toPair(PeriodDisplay).map((t) => {
  return {
    value: t.key,
    label: t.value,
  };
});

export class StatisticPeriod {
  public static DAY = new StatisticPeriod(1, 'DAY', 'Last Day');
  public static WEEK = new StatisticPeriod(2, 'WEEK', 'Last Week');
  public static MONTH = new StatisticPeriod(3, 'MONTH', 'Last Month');
  public static YEAR = new StatisticPeriod(4, 'YEAR', 'Last Year');
  public static ALL = new StatisticPeriod(5, 'ALL', 'All');

  public static All = [
    StatisticPeriod.DAY,
    StatisticPeriod.WEEK,
    StatisticPeriod.MONTH,
    StatisticPeriod.YEAR,
    StatisticPeriod.ALL,
  ];

  id: number;
  key: string;
  name: string;

  constructor(id: number, key: string, name: string) {
    this.id = id;
    this.key = key;
    this.name = name;
  }

  public static getByKey(key: string) {
    return StatisticPeriod.All.find((t) => t.key === key) || StatisticPeriod.MONTH;
  }
}

export type PoolData = {
  address: string;
  collateral: {
    address: string;
    symbol: string;
  };
  dToken: {
    address: string;
    symbol: string;
  };
  info: {
    ceiling: string;
    lockedCollateralAmount: string;
    unclaimedPoolCollateral: string;
    unclaimedPoolDiamond: string;
    mintingFee: string;
    redemptionFee: string;
    mintPaused: boolean;
    redeemPaused: boolean;
    targetCollateralRatio: string;
    effectiveCollateralRatio: string;
  };
};

export type Job = {
  jobId: string;
  executionTime: Date;
  completedTime: Date;
  message: string;
  exception: string;
  status: 'processing' | 'success' | 'failed';
  displayName: string;
  tags: Record<string, string>;
};

export type VSwapPoolToken = {
  address: string;
  decimals: number;
  ratio: number;
  symbol: string;
};

export type VSwapRewardToken = {
  address: string;
  symbol: string;
};

export type VSwapReward = {
  rewardPerBlock: number;
};

export type VSwapROI = {
  apy: number;
};

export type VSwapPoolData = {
  pid: number;
  lpPrice: number;
  lpToken: string;
  poolTokens: VSwapPoolToken[];
  rewardTokens: VSwapRewardToken[];
  rewards: { [key: string]: VSwapReward };
  roi: VSwapROI;
  totalSupply: number;
  totalSupplyUSD: number;
};

export type VSwapStakeToken = {
  address: string;
  decimals: number;
  symbol: string;
  price: number;
};

export type VSwapUnverifiedPoolData = {
  contractAddress: string;
  poolTokens: VSwapPoolToken[];
  stakeToken: VSwapStakeToken;
  rewardTokens: VSwapRewardToken[];
  rewards: { [key: string]: VSwapReward };
  roi: VSwapROI;
  totalSupply: number;
  totalSupplyUSD: number;
};

export type StakePoolInfo = {
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
  suffix?: string;
};

export type TicketItemProp = {
  id?: number;
};
