import React from 'react';
import styled from 'styled-components';
import { FadeAnimated } from '../Form';

interface CardProps {
  width?: string;
  padding?: string;
  animationDuration?: number;
  background?: string;
  border?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  width,
  padding,
  animationDuration,
  background,
  border,
}) => (
  <StyledCard
    width={width}
    padding={padding}
    animationDuration={animationDuration}
    background={background}
    border={border}
  >
    {children}
  </StyledCard>
);

Card.defaultProps = {
  animationDuration: 0,
};

type StyledCardProps = {
  width?: string;
  padding?: string;
  background?: string;
  animationDuration: number;
  border: string;
};

const StyledCard = styled(FadeAnimated)<StyledCardProps>`
  animation: fadeIn ${({ animationDuration }) => animationDuration}s;
  position: relative;
  min-width: 300px;
  width: ${({ width }) => (width ? width : 'auto')};
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.71);

  backdrop-filter: blur(9px);
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

  padding: ${({ padding }) => padding || '1rem'};
  z-index: 1;
  border: none;
  border-radius: 10px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100% !important;
  }
`;

export default Card;
