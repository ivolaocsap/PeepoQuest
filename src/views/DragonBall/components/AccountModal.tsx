import React, { useMemo } from 'react';
import styled from 'styled-components';
import Modal, { ModalProps } from 'src/components/Modal';
import Identicon from 'identicon.js';
import { useDisconnectAccount } from 'src/state/application/hooks';
import { useWeb3React } from '@web3-react/core';
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
          <AccountNumberContainer>Not Enough Tokens</AccountNumberContainer>
        </WalletInfoMain>
        <GroupButton>
          <ActionDisconnect
            className="btn"
            onClick={() => window.open('https://emojipedia.org/search/?q=sickle', '_blank')}
          >
            buy
          </ActionDisconnect>
        </GroupButton>
      </WalletInfo>
    </Modal>
  );
};

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 18px 24px;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.71);

  backdrop-filter: blur(9px);
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

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
  font-size: 20px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AccountNumber = styled.span`
  font-size: 20px;
  font-weight: bold;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  position: relative;
  left: 1vh;
  font-size: 12px;
  border-radius: 6px;
  height: 30px;
  padding: 0 12px;
`;

const ActionBscScan = styled.a`
  font-weight: 600;
  appearance: none;

  border-radius: 6px;
  height: 30px;
  padding: 0 12px;
  border: solid 0px #a3212a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ease-in-out 100ms;

  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border: solid 0px #ffffff;
  text-decoration: none;
  margin-left: 10px;
  font-size: 14px;
  &:hover {
    border: solid 0px #6b171d;
    background-color: #6b171d;
  }
`;
export default AccountModal;
