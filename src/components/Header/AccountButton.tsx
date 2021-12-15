import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Identicon from 'identicon.js';
import { useSavedConnector } from 'src/state/application/hooks';
import { useWeb3React } from '@web3-react/core';
import useWalletConnectors from 'src/hooks/useWalletConnectors';
import { Web3Provider } from '@ethersproject/providers';
import useTryConnect from 'src/hooks/useTryConnect';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';
import useModal from 'src/hooks/useModal';
import AccountModal from './AccountModal';
import Spacer from '../Spacer';
import { useAllTransactions } from 'src/state/transactions/hooks';
import Loading from '../Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons';
import { ConnectorNames } from 'src/state/application/reducer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { NetworkConnector } from 'src/libs/NetworkConnector';

const isMetaMaskConnected = () => {
  if (
    typeof window.ethereum !== 'undefined' &&
    window.ethereum.isMetaMask &&
    window.ethereum._metamask &&
    typeof window.ethereum._metamask.isUnlocked === 'function'
  ) {
    return window.ethereum._metamask.isUnlocked();
  }

  return Promise.resolve(false);
};

const AccountButton: React.FC = () => {
  const { account, activate, connector, deactivate } = useWeb3React<Web3Provider>();
  const [onPresentAccountModal] = useModal(<AccountModal />);
  const { tryConnect } = useTryConnect();
  const savedConnector = useSavedConnector();
  const connectors = useWalletConnectors();
  const allTransactions = useAllTransactions();
  const { chainId, defaultProvider } = useConfiguration();

  const defaultConnector = useMemo(
    () =>
      new NetworkConnector({
        urls: {
          [chainId]: Array.isArray(defaultProvider) ? defaultProvider[0] : defaultProvider,
        },
        defaultChainId: chainId,
      }),
    [chainId, defaultProvider],
  );

  const hasPendingTransaction = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter((tx) => !tx.receipt).length > 0;
  }, [allTransactions]);

  useEffect(() => {
    if (!account && !savedConnector) {
      activate(defaultConnector);
      return;
    }

    if (!account && savedConnector && connectors[savedConnector]) {
      if (savedConnector === ConnectorNames.Injected) {
        isMetaMaskConnected().then((connected) => {
          if (connected) {
            activate(connectors[savedConnector], (error) => {
              console.log('error', error);
              activate(defaultConnector);
            });
          } else {
            activate(defaultConnector);
          }
        });
      } else {
        activate(connectors[savedConnector], (error) => {
          console.log('error', error);
          activate(defaultConnector);
        });
      }
    }
  }, [account, activate, connectors, deactivate, defaultConnector, savedConnector]);

  useEffect(() => {
    if (connector) {
      const onChange = () => {
        window.location.reload();
      };
      connector.addListener('Web3ReactUpdate', onChange);

      return () => {
        connector.removeListener('Web3ReactUpdate', onChange);
      };
    }
  }, [connector]);

  const iconAccount = useMemo(() => {
    if (account) {
      const data = new Identicon(account, {
        size: 48,
        foreground: [50, 197, 255, 255],
        background: [0, 0, 0, 0],
        format: 'svg',
      }).toString();
      return `data:image/svg+xml;base64,${data}`;
    }
  }, [account]);

  const shortenAccount = useMemo(() => {
    if (account && account.length > 0) {
      return `${account.substring(0, 4)}.....${account.substring(
        account.length - 4,
        account.length,
      )}`;
    }
  }, [account]);

  return (
    <StyledAccountButton active={!!library}>
      {account ? (
        <button className="btn btn-outline" onClick={onPresentAccountModal}>
          <AccountInfo>
            <img src={iconAccount} />
            {hasPendingTransaction && (
              <>
                <Spacer size="sm" />
                <Loading size="18px" color="#ffffff" />
              </>
            )}
            <Spacer size="xs" />
            <AccountNumber>{shortenAccount}</AccountNumber>
          </AccountInfo>
        </button>
      ) : !library ? (
        <button className="btn btn-outline">
          <FontAwesomeIcon icon={faSatelliteDish} style={{ marginRight: '5px' }} />
          <span className="d-none d-lg-inline">Waiting for network</span>
        </button>
      ) : (
        <button className="btn" onClick={() => tryConnect()}>
          Connect
        </button>
      )}
    </StyledAccountButton>
  );
};

const StyledAccountButton = styled.div<{ active?: boolean }>`
  background: transparent;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AccountInfo = styled.span`
  font-size: 14px;
  display: flex;
  align-items: center;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  img {
    width: 24px;
    height: auto;
    border-radius: 100%;
  }
`;

const AccountNumber = styled.span`
  margin-right: 10px;
  text-transform: lowercase;
  @media (max-width: 1070px) {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export default AccountButton;
