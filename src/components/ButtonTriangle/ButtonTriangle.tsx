import { ReactText } from 'react';
import styled, { DefaultTheme } from 'styled-components';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
const getSize = (size: ButtonSize) => {
  switch (size) {
    case 'xs':
      return 32;
    case 'sm':
      return 38;
    case 'md':
      return 42;
    case 'lg':
      return 48;

    default:
      return 46;
  }
};

const getColor = (disable: boolean, buttonStyle: string, theme: DefaultTheme) => {
  if (disable) {
    if (buttonStyle === 'danger') return theme.color.red[300];
    return theme.color.grey[800];
  }
  return theme.color.primary.main;
};

type StyledButtonProps = {
  size?: ButtonSize;
  width?: ReactText;
  isLoading?: boolean;
  buttonStyle?: string;
};

export const ButtonTriangle = styled.button<StyledButtonProps>`
  width: ${({ width }) => (width ? width : undefined)};
  display: flex;
  flex: 1;
  border: none;
  padding: 0px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  height: ${({ size }) => `${getSize(size)}px`};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  background: ${({ theme, disabled, buttonStyle }) => getColor(disabled, buttonStyle, theme)};
  color: ${({ isLoading, theme }) =>
    isLoading ? theme.color.primary.light : theme.color.blue[800]};
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-weight: 600;
  position: relative;
  margin: ${({ size }) => `0px ${getSize(size) / 4}px`};
  &::before {
    content: '';
    position: absolute;
    right: 100%;
    border-style: solid;
    border-width: ${({ size }) =>
      `${getSize(size) / 2}px ${getSize(size) / 4}px ${getSize(size) / 2}px 0px`};
    border-color: transparent
      ${({ theme, disabled, buttonStyle }) => getColor(disabled, buttonStyle, theme)}
      transparent transparent;
  }
  &::after {
    content: '';
    position: absolute;
    left: 100%;
    border-style: solid;
    border-width: ${({ size }) =>
      `${getSize(size) / 2}px 0px ${getSize(size) / 2}px ${getSize(size) / 4}px`};
    border-color: transparent transparent transparent
      ${({ theme, disabled, buttonStyle }) => getColor(disabled, buttonStyle, theme)};
  }
  &:hover {
    filter: ${({ theme, disabled }) =>
      !disabled ? `drop-shadow(0 0 6px ${theme.color.primary.main})` : undefined};
  }
  &:disabled {
    cursor: auto;
  }
`;

export default ButtonTriangle;
