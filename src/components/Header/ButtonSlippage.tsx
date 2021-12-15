import React from 'react';
import { useGetSlippageTolerance } from 'src/state/application/hooks';
import styled from 'styled-components';

interface ButtonSlippage {
  value?: number;
  onClick?: () => void;
  border?: boolean;
}

const ButtonSlippage: React.FC<ButtonSlippage> = ({ value, onClick, children, border }) => {
  const slippage = useGetSlippageTolerance();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onButtonClick = ($event: any) => {
    $event.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      {!!value && (
        <StyledButton selected={slippage === value} onClick={($event) => onButtonClick($event)}>
          {value * 100}%
        </StyledButton>
      )}
      {!!children && <StyledButton border={border}>{children}</StyledButton>}
    </>
  );
};

const StyledButton = styled.button<{ selected?: boolean; border?: boolean }>`
  align-items: center;
  text-align: center;
  height: 1.8rem;
  font-family: ${(p) => p.theme.font.sans};
  font-size: 0.87rem;
  font-weight: 600;
  width: auto;
  min-width: 3.5rem;
  border: 2px solid ${({ theme }) => theme.color.primary.main};
  color: ${({ selected, theme }) => (selected ? theme.color.white : theme.color.primary.main)};
  outline: none;
  background: transparent;
  margin-right: 8px;
  user-select: none;
  cursor: pointer;
  background-color: ${({ selected, theme }) =>
    selected ? theme.color.primary.main : 'transparent'};
  &:hover {
    background-color: ${({ selected, theme }) =>
      selected ? theme.color.primary.main : theme.color.green[100]};
  }
`;

export default ButtonSlippage;
