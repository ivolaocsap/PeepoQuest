import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { ButtonAction } from 'src/components/ButtonAction';
import { BigNumber } from '@ethersproject/bignumber';
import styled, { keyframes } from 'styled-components';
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

export const ButtonHarvest: React.ForwardRefRenderFunction<unknown, ButtonStakeProps> = ({
  amount,
}) => {
  const dh = useDiamondHand();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const config = useConfiguration();
  const [token, setToken] = useState<ERC20 | undefined>();
  const balance = useTokenBalance(token);

  useEffect(() => {
    if (!dh || token) return;
    setToken(dh.PEEPOQUEST);
  }, [dh, token]);

  const buyAddress = useMemo(() => {
    if (!config) {
      return;
    }
    return config?.addresses?.MasterChef;
  }, [config]);

  const [approvalTokenState, approveToken] = useApprove(token, buyAddress);

  const stake = async () => {
    try {
      const tx = await handleTransactionReceipt(
        dh.MASTERCHEF?.deposit(0, BigNumber.from('0')),
        `Harvest`,
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
        return 'Harvest';
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
        stake();
        break;
    }
  }, [status, approveToken, stake]);

  return <StyledButtonAction onClick={onClickBuy}>{buttonText}</StyledButtonAction>;
};

const TransitioningBackground = keyframes`
  0% {
    background-position: 1% 0%;
  }
  50% {
    background-position: 99% 100%;
  }
  100% {
    background-position: 1% 0%;
  }
`;

const StyledButtonAction = styled(ButtonAction)`
  font-size: 18px;
  font-weight: 600;

  text-align: center;
  width: 150px;
  height: 50px;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  z-index: 6;
  position: relative;
  overflow: hidden;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  background-size: 400% 400%;
  animation: ${TransitioningBackground} 10s ease infinite;

  transition: 0.6s;

  &::before {
    content: '';
    display: block;
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    width: 60px;
    height: 100%;
    top: 0;
    filter: blur(30px);
    transform: translateX(-100px) skewX(-15deg);
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    background: rgba(255, 255, 255, 0.2);
    width: 30px;
    height: 100%;
    top: 0;
    filter: blur(5px);
    transform: translateX(-100px) skewX(-15deg);
  }

  &:hover {
    background-image: linear-gradient(to left, ${(p) => p.theme.color.secondary}, #d155b8);
    transform: scale(1.05);
    cursor: pointer;

    &::before,
    &::after {
      transform: translateX(300px) skewX(-15deg);
      transition: 0.7s;
    }
  }
`;
