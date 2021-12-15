import React, { MouseEvent } from 'react';
import { useGetSlippageTolerance } from 'src/state/application/hooks';
import styled from 'styled-components';

interface ButtonSlippage {
  value?: number;
  onClick?: () => void;
  border?: boolean;
}

const ButtonSlippage: React.FC<ButtonSlippage> = ({ value, onClick, children, border }) => {
  const slippage = useGetSlippageTolerance();
  const onButtonClick = ($event: MouseEvent) => {
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
  border-radius: 32px;
  font-size: 0.87rem;
  font-weight: 600;
  width: auto;
  min-width: 3.5rem;
  border: 1px solid ${({ border, theme }) => (border ? theme.color.primary.light : '#1a143e')};
  outline: none;
  margin-right: 8px;
  color: ${(p) => (p.selected ? p.theme.color.blue[800] : '#fff8')};
  user-select: none;
  cursor: pointer;
  &:hover {
    border: 1px solid
      ${({ border, theme }) => (border ? theme.color.primary.main : 'rgb(86, 90, 105)')};
  }
  background-color: ${({ selected, theme }) =>
    selected ? theme.color.primary.main : '#0903277a'};
`;

export default ButtonSlippage;
