import React from 'react';
import styled, { DefaultTheme } from 'styled-components';

type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'homepage';
interface ContainerProps {
  children?: React.ReactNode;
  size?: ContainerSize;
}

const getSize = (theme: DefaultTheme, size: ContainerSize = 'md') => {
  const { siteWidth } = theme;
  let width: number;
  switch (size) {
    case 'xs':
      width = siteWidth / 2.5;
      break;
    case 'sm':
      width = siteWidth / 2;
      break;
    case 'md':
      width = (siteWidth * 2) / 3;
      break;
    case 'homepage':
      width = siteWidth * 1.7;
      break;
    case 'lg':
    default:
      width = siteWidth;
  }

  return width;
};

const Container = styled.div<ContainerProps>`
  box-sizing: border-box;
  cursor: url('cursor.gif'), auto;
  margin: 0 auto;

  background-size: 100%;
  max-width: ${(props) => getSize(props.theme, props.size)}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  width: 100%;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${(props) => props.theme.spacing[3]}px;
  }
`;

export default Container;
