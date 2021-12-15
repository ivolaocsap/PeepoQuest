import React, { useMemo } from 'react';
import styled from 'styled-components';
import Modal, { ModalProps } from '../Modal';
import Identicon from 'identicon.js';
import { useDisconnectAccount } from 'src/state/application/hooks';
import { useWeb3React } from '@web3-react/core';
import AccountTransactions from './AccountTransactions';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const config = useConfiguration();
  const { account, deactivate } = useWeb3React();
  const disconnectAccount = useDisconnectAccount();

  const iconAccount = useMemo(() => {
    if (account) {
      const data = new Identicon(account, 48).toString();
      return `data:image/png;base64,${data}`;
    }
  }, [account]);

  const shortenAccount = useMemo(() => {
    if (account && account.length > 0) {
      return `${account.substring(0, 5)}.....${account.substring(
        account.length - 6,
        account.length,
      )}`;
    }
  }, [account]);

  const disconnect = () => {
    deactivate();
    disconnectAccount();
    onDismiss();
  };

  return (
    <Modal size="md" padding="0">
      <WalletInfo>
        <WalletInfoIcon src={iconAccount}></WalletInfoIcon>
        <WalletInfoMain>
          <AccountNumberContainer>
            <AccountNumber>{shortenAccount || ''}</AccountNumber>
          </AccountNumberContainer>
          <WalletTitle>Connected</WalletTitle>
        </WalletInfoMain>
        <GroupButton>
          <ActionDisconnect className="btn" onClick={disconnect}>
            Disconnect
          </ActionDisconnect>
          <ActionBscScan href={`${config.etherscanUrl}/address/${account}`} target="_blank">
            Go to Explorer
          </ActionBscScan>
        </GroupButton>
      </WalletInfo>
      <AccountTransactions />
    </Modal>
  );
};

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 18px 24px;
  background: #1a1e22;
  border-radius: 10px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const WalletInfoMain = styled.div`
  flex: 1;
`;
const AccountNumberContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AccountNumber = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const WalletInfoIcon = styled.img`
  height: 50px;
  width: auto;
  margin-right: 15px;
  flex-shrink: 0;
  border-radius: 100%;
  overflow: hidden;
`;

const WalletTitle = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.color.secondary};
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const GroupButton = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 10px;
  }
`;

const ActionDisconnect = styled.button`
  font-size: 12px;
  border-radius: 6px;
  height: 30px;
  padding: 0 12px;
`;

const ActionBscScan = styled.a`
  font-weight: 600;
  appearance: none;
  font-family: ${(p) => p.theme.font.heading};

  border-radius: 6px;
  height: 30px;
  padding: 0 12px;
  border: solid 0px #a3212a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ease-in-out 100ms;
  text-transform: uppercase;
  background: transparent;

  border: solid 0px #ffffff;
  text-decoration: none;
  margin-left: 10px;
  font-size: 12px;
  &:hover {
    border: solid 0px #6b171d;
    background-color: #6b171d;
  }
`;
export default AccountModal;
