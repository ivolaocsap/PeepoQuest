import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { ButtonAction } from 'src/components/ButtonAction';
import { BigNumber } from '@ethersproject/bignumber';
import styled from 'styled-components';
import useDiamondHand from 'src/hooks/useDiamondHand';
import useHandleTransactionReceipt from 'src/hooks/useHandleTransactionReceipt';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';
import { useTokenBalance } from 'src/contexts/AccountBalanceProvider/AccountBalanceProvider';
import useApprove, { ApprovalState } from 'src/hooks/useApprove';
import ERC20 from 'src/diamondhand/ERC20';

enum ButtonStatus {
  notConnected = 1,
  insufficient = 2,
  requireApproval = 3,
  approvalPending = 4,
  paused = 15,
  ready = 20,
  notEnough = 21,
}

interface ButtonStakeProps {
  amount?: BigNumber;
}

export const ButtonStake: React.ForwardRefRenderFunction<unknown, ButtonStakeProps> = ({
  amount,
}) => {
  const dh = useDiamondHand();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const config = useConfiguration();
  const [token, setToken] = useState<ERC20 | undefined>();
  const balance = useTokenBalance(token);

  useEffect(() => {
    if (!dh) return;
    setToken(dh?.MIM);
  }, [dh, token]);

  const buyAddress = useMemo(() => {
    if (!config) {
      return;
    }
    return config?.addresses?.MasterChef;
  }, [config]);

  const [approvalTokenState, approveToken] = useApprove(token, buyAddress);

  const magik = async () => {
    try {
      console.log(amount);
      const tx = await handleTransactionReceipt(
        dh.MASTERCHEF?.magikFaucet(config?.addresses?.Mim, amount),
        `Magik woosh`,
      );
      if (tx && tx.response) {
        await tx.response.wait();
        tx.hideModal();
      }
    } catch {
      //
    }
  };

  const status = useMemo(() => {
    if (approvalTokenState == ApprovalState.PENDING) {
      return ButtonStatus.approvalPending;
    }

    if (approvalTokenState !== ApprovalState.APPROVED) {
      return ButtonStatus.requireApproval;
    }

    return ButtonStatus.ready;
  }, [approvalTokenState, balance]);

  const buttonText = useMemo(() => {
    switch (status) {
      case ButtonStatus.approvalPending:
        return `Approving ${token?.symbol}...`;

      case ButtonStatus.requireApproval:
        return 'Approve';
      default:
        return 'Get MIM';
    }
  }, [status, token]);

  const onClickBuy = useCallback(async () => {
    switch (status) {
      case ButtonStatus.requireApproval:
        await approveToken();
        break;
      case ButtonStatus.approvalPending:
        break;
      case ButtonStatus.ready:
        magik();
        break;
    }
  }, [status, approveToken, magik]);

  return (
    <StyledButtonAction onClick={onClickBuy}>
      <StyledText>{buttonText}</StyledText>
    </StyledButtonAction>
  );
};

const StyledButtonAction = styled(ButtonAction)`
  display: inline-block;
  width: initial;
  text-color: #f4b5d2;

  background-color: #5a8f35;
  :hover {
    background-color: #a1118b;
  }
`;
const StyledText = styled.div`

  font-size: 20px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  }
`;
