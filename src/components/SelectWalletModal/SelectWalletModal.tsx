import React, { useCallback } from 'react';
import styled from 'styled-components';
import Modal, { ModalBody, ModalCloseButton, ModalHeader, ModalTitle } from '../Modal';
import MetamaskLogo from '../../assets/img/metamask.png';
import TrustWalletLogo from '../../assets/img/TrustWallet.svg';
import MathWalletLogo from '../../assets/img/MathWallet.svg';
import safeWalletLogo from '../../assets/img/SafeWallet.svg';
import binanceLogo from '../../assets/img/BinanceChain.svg';
import TokenPocketLogo from '../../assets/img/TokenPocker.svg';
import WalletConnectLogo from '../../assets/img/wallet_connect.png';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useAddPopup, useSetConnectedAccount } from 'src/state/application/hooks';
import useWalletConnectors from '../../hooks/useWalletConnectors';
import { ConnectorNames } from 'src/state/application/reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';

export interface SelectWalletModalProps {
  onDismiss?: () => void;
}

interface Wallet {
  connector: ConnectorNames;
  name: string;
  image: string;
}

const SelectWalletModal: React.FC<SelectWalletModalProps> = ({ onDismiss }) => {
  const { activate, connector, account } = useWeb3React();
  const connectors = useWalletConnectors();
  const saveAccount = useSetConnectedAccount();
  const addPopup = useAddPopup();
  const { defaultProvider, etherscanUrl, chainId } = useConfiguration();
  const wallets = [
    {
      connector: ConnectorNames.Injected,
      name: 'MetaMask',
      image: MetamaskLogo,
    },
    {
      connector: ConnectorNames.WalletConnect,
      name: 'Wallet Connect',
      image: WalletConnectLogo,
    },
    {
      connector: ConnectorNames.BSC,
      name: 'Binance Wallet',
      image: binanceLogo,
    },
    {
      connector: ConnectorNames.Injected,
      name: 'TrustWallet',
      image: TrustWalletLogo,
    },
    {
      connector: ConnectorNames.Injected,
      name: 'MathWallet',
      image: MathWalletLogo,
    },
    {
      connector: ConnectorNames.Injected,
      name: 'TokenPocket',
      image: TokenPocketLogo,
    },
    {
      connector: ConnectorNames.Injected,
      name: 'SafePal Wallet',
      image: safeWalletLogo,
    },
  ] as Wallet[];
  const onConnectPress = useCallback(
    (connectionId: ConnectorNames) => {
      activate(connectors[connectionId], (error) => {
        if (
          error instanceof UnsupportedChainIdError &&
          connectors[connectionId] instanceof InjectedConnector
        ) {
          window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x' + chainId.toString(16), // A 0x-prefixed hexadecimal string
                chainName: 'Binance Smart Chain',
                nativeCurrency: {
                  name: 'Binance Coin',
                  symbol: 'BNB',
                  decimals: 18,
                },
                rpcUrls: Array.isArray(defaultProvider) ? defaultProvider : [defaultProvider],
                blockExplorerUrls: [etherscanUrl],
              },
            ],
          });
        } else {
          addPopup({
            error: {
              title: 'Connect wallet error',
              message: error?.message,
            },
          });
        }
        return;
      });
      saveAccount(account, connectionId);
      onDismiss();
    },
    [
      account,
      activate,
      addPopup,
      chainId,
      connectors,
      defaultProvider,
      etherscanUrl,
      onDismiss,
      saveAccount,
    ],
  );
  return (
    <Modal size="sm" padding="0">
      <ModalHeader>
        <ModalTitle>Connect to a Wallet</ModalTitle>
        <ModalCloseButton onClick={onDismiss}>
          <FontAwesomeIcon icon={faCoffee} />
        </ModalCloseButton>
      </ModalHeader>
      <ModalBody>
        <List>
          {wallets.map((wallet) => (
            <Item
              key={wallet.name}
              onClick={() => {
                if (connector !== connectors[wallet.connector]) {
                  onConnectPress(wallet.connector);
                }
              }}
            >
              <WalletName>{wallet.name}</WalletName>
              <WalletLogo
                src={wallet.image}
                alt={`${wallet.name} Logo`}
                width={32}
                height={32}
              />
            </Item>
          ))}
        </List>
      </ModalBody>
    </Modal>
  );
};

const List = styled.ul`
  overflow: hidden;
  list-style-type: none;
  padding: 0px;
  margin: 0px;
`;

const Item = styled.li<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 10px 0px;
  padding: 10px 15px;
  border: solid 0px #c2c2c266;
  border-radius: 10px;
  &:hover {
    background-color: #a3212a;
    border-color: #a3212a;
    font-size: 18px;
    background: -webkit-linear-gradient(#a3212a, #a3212a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const WalletName = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
`;

const WalletLogo = styled.img`
  margin-left: auto;
  border-radius: 24px;
`;

export default SelectWalletModal;
