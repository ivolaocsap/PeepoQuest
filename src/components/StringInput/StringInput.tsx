import { BigNumber } from '@ethersproject/bignumber';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTokenBalance } from '../../contexts/AccountBalanceProvider/AccountBalanceProvider';
import useDiamondHand from '../../hooks/useDiamondHand';
import ERC20 from '../../diamondhand/ERC20';
import { getDisplayNumber, parseNumber } from '../../utils/formatBN';

interface TokenInputProps {
  token: ERC20;
  decimals?: number;
  precision?: number;
  disabled?: boolean;
  hasError?: boolean;
  onMax?: () => void;
  onChange?: (value: BigNumber) => void;
  max?: number;
  maxBalance?: BigNumber;
  value?: BigNumber;
}

const TokenInput: React.ForwardRefRenderFunction<unknown, TokenInputProps> = (
  { token, hasError, disabled, decimals, precision, onChange, max = 1e9, maxBalance, value },
  ref,
) => {
  const [input, setInput] = useState<string>(value ? getDisplayNumber(value, decimals) : '');
  const _balance = useTokenBalance(token);
  const diamondHand = useDiamondHand();
  const balance = useMemo(() => {
    if (maxBalance) {
      return maxBalance;
    }

    return _balance;
  }, [maxBalance, _balance]);

  const patchInputValue = useCallback(
    (newValue: BigNumber) => {
      let newInput = '';
      try {
        newInput = getDisplayNumber(newValue, decimals, precision, false, false, false, false);
      } catch (e) {
        newInput = '';
      }
      setInput(newInput || '');
      return newInput;
    },
    [decimals, precision],
  );

  useImperativeHandle(
    ref,
    () => ({
      resetInput: patchInputValue,
    }),
    [patchInputValue],
  );

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const _value = (event.target as HTMLInputElement).value;
    broadcast(_value);
  };

  const broadcast = (_value: string) => {
    if (!isInputValid(_value)) {
      return false;
    }
    if (!isNaN(+_value)) {
      setInput(_value);
      const parsedValue = parseNumber(_value, decimals, precision);
      onChange(parsedValue);
    }
  };

  const isInputValid = (inputValue: string) => {
    if (isNaN(+inputValue)) {
      return false;
    }
    if (inputValue === undefined) {
      return false;
    }
    const splits = inputValue.split('.');
    const countDecimals = splits[1]?.length || 0;
    if (countDecimals > precision) {
      return false;
    }
    if (+inputValue > max) {
      return false;
    }
    return true;
  };

  const onMax = () => {
    patchInputValue(balance);
    onChange(balance);
  };

  return (
    <StyledTokenInputWrapper>
      <StyledTokenInput
        hasError={hasError}
        disabled={disabled}
        type="text"
        pattern="^[0-9]*[.,]?[0-9]*$"
        placeholder={disabled ? '-' : '0'}
        minLength={1}
        maxLength={79}
        spellCheck={false}
        inputMode="decimal"
        onChange={(e) => onInputChange(e)}
        value={input}
      ></StyledTokenInput>
    
    </StyledTokenInputWrapper>
  );
};

const StyledTokenInputWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-right: 10px;
  flex: 1;
`;

const StyledTokenInput = styled.input<{ hasError?: boolean }>`
  color: ${({ theme, hasError }) =>
    hasError ? theme.color.red[500] : theme.color.primary.light};
  width: 0px;
  position: relative;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: transparent;
  font-size: 32px;

  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  appearance: textfield;
  font-family: ${({ theme }) => theme.font.monospace};
  font-weight: bold;
`;

const StyledButtonMax = styled.button`
  appearance: none;
  border: solid 0px ${(props) => props.theme.color.primary.main};
  background-color: #5a8f35;
  color: ${(props) => props.theme.color.primary.light};

  font-size: 0.85rem;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 3px 8px;
  cursor: pointer;
  transition: ease-in-out 100ms;
  font-family: ${({ theme }) => theme.font.monospace};
  font-weight: bold;
  &:hover {
    background-color: ${(props) => props.theme.color.primary.main};
  }
`;

export default forwardRef(TokenInput);
