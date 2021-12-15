import { BigNumber } from '@ethersproject/bignumber';
import axios, { Method, ResponseType, AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { usePolling } from 'src/hooks/usePolling';
import { useHideLoading, useShowLoading } from 'src/state/application/hooks';
import { useConfiguration } from '../contexts/ConfigProvider/ConfigProvider';
import { Job, Measurement, Period, PoolData } from './models';

export type ApiRequestOption = {
  method: Method;
  body: any;
  responseType?: ResponseType;
  params?: any;
};

export const toBn = (x: string | null | undefined) => (x ? BigNumber.from(x) : null);

export const useFetch = () => {
  const configuration = useConfiguration();
  return useCallback(
    async <T>(config: AxiosRequestConfig) => {
      if (!configuration.backendUrl) {
        return;
      }

      config.baseURL = configuration.backendUrl;
      config.responseType = 'json';
      return axios
        .request(config)
        .then((res) => {
          return res.data as T;
        })
        .catch((e) => {
          if (e.response && e.response.status === 400) {
            return Promise.reject(e.response.data);
          }
          return Promise.reject(e.response || new Error('General error'));
        });
    },
    [configuration],
  );
};

export const useFetchRaw = () => {
  const fetch = useCallback(async (config: AxiosRequestConfig) => {
    config.responseType = 'json';
    return axios
      .request(config)
      .then((res) => res.data)
      .catch((e) => {
        if (e.response && e.response.status === 400) {
          return Promise.reject(e.response.data);
        }
        return Promise.reject(e.response || new Error('General error'));
      });
  }, []);

  return fetch;
};

export const usePoolList = () => {
  const fetch = useFetch();
  const [pools, setPools] = useState<PoolData[]>();
  const showLoading = useShowLoading();
  const hideLoading = useHideLoading();

  useEffect(() => {
    let mounted = true;
    showLoading();
    fetch<PoolData[]>({
      url: '/pools',
    })
      .then((data) => {
        hideLoading();
        if (mounted) {
          setPools(data);
        }
      })
      .catch(() => hideLoading());

    return () => {
      mounted = false;
    };
  }, [fetch, hideLoading, showLoading]);

  return { pools };
};

export const useGetVFarmPoolInfo = () => {
  const fetch = useFetchRaw();
  return useCallback(async () => {
    return await fetch({
      url: 'https://api.vswap.fi/api/faas/get-stats?whitelistedBy=ALL',
    });
  }, [fetch]);
};

export const useTotalValueLocked = () => {
  const fetch = useFetch();
  const [value, setValue] = useState<BigNumber>();

  const reload = useCallback(async () => {
    const res = await fetch<{ value: string }>({ url: '/statistic/tvl' });

    if (res) {
      setValue(BigNumber.from(res.value));
    }
  }, [fetch]);

  useEffect(() => {
    reload();
  }, [reload]);

  usePolling(reload, 10 * 60e3);

  return value;
};

export const useGetStatistic = (measurement: Measurement, period: Period) => {
  const fetch = useFetch();

  return useCallback(async () => {
    if (!measurement || !period) {
      return;
    }

    return await fetch<any>({
      url: '/statistic',
      params: { measurement, period },
    });
  }, [fetch, measurement, period]);
};

type TokenData = {
  symbol: string;
  price: BigNumber;
  totalSupply: BigNumber;
  marketCap: BigNumber;
};

export const useTokenInfo = (tokenSymbols: string[]) => {
  const fetch = useFetch();
  const [value, setValue] = useState<TokenData[]>();

  const reload = useCallback(async () => {
    if (!tokenSymbols || !tokenSymbols.length) {
      return;
    }
    const res = await fetch<
      {
        symbol: string;
        price: string;
        totalSupply: string;
        marketCap: string;
      }[]
    >({
      url: '/token/info',
      method: 'post',
      data: {
        tokens: tokenSymbols,
      },
    });
    if (res) {
      setValue(
        res.map((x) => {
          return {
            symbol: x.symbol,
            price: toBn(x.price),
            totalSupply: toBn(x.totalSupply),
            marketCap: toBn(x.marketCap),
          };
        }),
      );
    }
  }, [fetch, tokenSymbols]);

  useEffect(() => {
    reload();
  }, [reload]);

  usePolling(reload, 10 * 60e3);

  return value;
};

export const useGetHarvestLog = (asset: string) => {
  const fetch = useFetch();

  return useCallback(
    async (skip: number, take: number) => {
      return (await fetch({
        url: `vault/harvest?skip=${skip}&take=${take}&asset=${asset}`,
      })) as Promise<any>;
    },
    [fetch, asset],
  );
};

export const useJobHistory = (address?: string) => {
  const fetch = useFetch();
  return useCallback(
    (skip, take) => {
      return fetch<{ items: Job[] }>({
        url: '/jobs/history',
        params: {
          skip,
          take,
          pool: address,
        },
      });
    },
    [fetch, address],
  );
};

export const useTokenPrice = (tokenSymbol: string) => {
  const fetch = useFetch();

  return useCallback(async () => {
    if (!tokenSymbol) {
      return;
    }
    return await fetch<Record<string, string>>({
      url: '/token/price',
      method: 'post',
      data: {
        tokens: [tokenSymbol],
      },
    }).then((res) => res[tokenSymbol]);
  }, [fetch, tokenSymbol]);
};
