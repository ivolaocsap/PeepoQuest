import React, { useCallback, useMemo } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import styled from 'styled-components';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';
import useApprove, { ApprovalState } from 'src/hooks/useApprove';
import useDiamondHand from 'src/hooks/useDiamondHand';
import useTryConnect from 'src/hooks/useTryConnect';
import theme from 'src/theme';
import { useTokenBalance } from 'src/contexts/AccountBalanceProvider/AccountBalanceProvider';
import crypto from 'crypto';
import useHandleTransactionReceipt from 'src/hooks/useHandleTransactionReceipt';
import { useWeb3React } from '@web3-react/core';

enum ButtonStatus {
  notConnected = 1,
  notInputTicket = 2,
  requireApproval = 3,
  ready = 4,
  notEnoughiron = 5,
}

type BuyMultiLotteryProps = {
  costPerTicket: BigNumber;
  numberTicket: number;
  max: number;
  powerBallMax: number;
  lotteryId: number;
  onDismiss?: () => void;
};

const BuyMultiLotteryButton: React.FC<BuyMultiLotteryProps> = ({
  costPerTicket,
  numberTicket,
  max,
  powerBallMax,
  lotteryId,
}) => {
  const diamondHand = useDiamondHand();
  const { tryConnect } = useTryConnect();
  const config = useConfiguration();
  const { account } = useWeb3React();
  const balance = useTokenBalance(diamondHand?.PEEPOQUEST);
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const [approvalironState, approveiron] = useApprove(
    diamondHand?.PEEPOQUEST,
    config?.addresses?.Lottery,
  );

  const totalCost = useMemo(() => {
    if (!costPerTicket) {
      return BigNumber.from(0);
    }
    return costPerTicket.mul(numberTicket || 0);
  }, [costPerTicket, numberTicket]);

  const status = useMemo(() => {
    if (!account) {
      return ButtonStatus.notConnected;
    }

    if (numberTicket === 0) {
      return ButtonStatus.notInputTicket;
    }

    if (approvalironState !== ApprovalState.APPROVED) {
      return ButtonStatus.requireApproval;
    }

    if (balance && balance.lt(totalCost)) {
      return ButtonStatus.notEnoughiron;
    }

    return ButtonStatus.ready;
  }, [approvalironState, account, totalCost, balance, numberTicket]);

  const ranHex = (length: number) => {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  };

  const rand = useCallback((n: number, max: number, maxPowerBall: number) => {
    const hex = ranHex(64);
    let array: number[] = [];

    for (let index = 0; index < max; index++) {
      array[index] = index + 1;
    }

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    array = array.slice(0, n);
    array.push((parseInt('0x' + hex.substr(n + 1, 8)) % maxPowerBall) + 1);

    return array;
  }, []);

  const buy = useCallback(() => {
    // TODO REFACTOR
    let numbers: number[] = [];
    for (let i = 0; i < numberTicket; i++) {
      const randomData = rand(4, max, powerBallMax);
      numbers = numbers.concat(randomData);
    }
    handleTransactionReceipt(
      diamondHand?.LOTTERY.batchBuyLottoTicket(lotteryId, numberTicket, numbers),
      `Buy ${numberTicket} iron Offerings`,
    );
  }, [
    handleTransactionReceipt,
    lotteryId,
    diamondHand?.LOTTERY,
    numberTicket,
    rand,
    max,
    powerBallMax,
  ]);

  const handleClick = useCallback(async () => {
    switch (status) {
      case ButtonStatus.notConnected:
        tryConnect();
        break;
      case ButtonStatus.requireApproval:
        await approveiron();
        break;
      case ButtonStatus.notEnoughiron:
      case ButtonStatus.notInputTicket:
        break;
      case ButtonStatus.ready:
        buy();
        break;
    }
  }, [approveiron, buy, tryConnect, status]);

  const buttonText = useMemo(() => {
    switch (status) {
      case ButtonStatus.notConnected:
        return 'Connect';

      case ButtonStatus.notInputTicket:
        return 'Input Number Ticket';

      case ButtonStatus.requireApproval:
        return 'Approve';

      case ButtonStatus.notEnoughiron:
        return 'Not Enough iron';

      default:
        return 'Buy tickets';
    }
  }, [status]);

  return (
    <StyledButtonBuy
      type="button"
      className={
        status == ButtonStatus.notEnoughiron || status === ButtonStatus.notInputTicket
          ? 'btn not-enough'
          : 'btn'
      }
      onClick={handleClick}
    >
      {buttonText}
    </StyledButtonBuy>
  );
};

const StyledButtonBuy = styled.button`
  margin-left: auto;
  padding: 25px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: normal;
  border: 3px solid ${theme.color.primary.main};
  cursor: pointer;
  background-color: ${theme.color.green[100]};
  &.not-enough {
    background-color: #ff9e9e;
  }
`;

export default BuyMultiLotteryButton;
