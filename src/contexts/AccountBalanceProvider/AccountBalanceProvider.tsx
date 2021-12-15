import { BigNumber } from '@ethersproject/bignumber';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import useDiamondHand from '../../hooks/useDiamondHand';
import useIsWindowVisible from '../../hooks/useIsWindowVisible';
import ERC20 from '../../diamondhand/ERC20';
import { useBlockNumber } from '../../state/application/hooks';
import { useConfiguration } from '../ConfigProvider/ConfigProvider';
import { useWeb3React } from '@web3-react/core';

type BalanceState = Record<string, BigNumber>;
const GetBalanceContext = createContext<BalanceState>(null);
const SetListeningTokenContext = createContext<(token: ERC20) => void>(null);

export const AccountBalanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<BalanceState>({});
  const [listeningToken, _setListeningToken] = useState<ERC20[]>([]);
  const { addresses } = useConfiguration();
  const isWindowVisible = useIsWindowVisible();
  const blockNumber = useBlockNumber();
  const PeepoQuestBank = useDiamondHand();
  const lastCheckedBlockNumber = useRef<number>();
  const { library: provider } = useWeb3React();
  const { account } = useWeb3React();

  const getBalance = useCallback(async () => {
    if (!account || !addresses?.Multicall) {
      return {};
    }
    return await ERC20.multicallTokenBalance(
      provider,
      addresses.Multicall,
      listeningToken.map((t) => t.address),
      account,
    );
  }, [account, addresses?.Multicall, listeningToken, provider]);

  useEffect(() => {
    let mounted = true;
    if (!PeepoQuestBank?.isUnlocked) {
      setBalance({});
    } else if (isWindowVisible) {
      if (lastCheckedBlockNumber.current === blockNumber) {
        return;
      }

      getBalance().then((res) => {
        if (mounted) {
          setBalance(res);
        }
      });
    }

    return () => {
      mounted = false;
    };
  }, [
    blockNumber,
    PeepoQuestBank,
    PeepoQuestBank?.isUnlocked,
    listeningToken,
    isWindowVisible,
    getBalance,
  ]);

  const setListeningToken = useCallback((token: ERC20) => {
    if (!token) {
      return;
    }
    _setListeningToken((x) => {
      if (x.some((t) => t.symbol === token.symbol)) {
        return x;
      }

      return [...x, token];
    });
  }, []);

  return (
    <GetBalanceContext.Provider value={balance}>
      <SetListeningTokenContext.Provider value={setListeningToken}>
        {children}
      </SetListeningTokenContext.Provider>
    </GetBalanceContext.Provider>
  );
};

export const useTokenBalance = (token: ERC20): BigNumber => {
  const setListeningToken = useContext(SetListeningTokenContext);
  useEffect(() => {
    if (token) {
      setListeningToken(token);
    }
  }, [setListeningToken, token]);

  const context = useContext(GetBalanceContext);

  if (context == null || setListeningToken == null) {
    throw new Error('BalanceContextProvider not found');
  }

  return token ? context[token.address] : null;
};
