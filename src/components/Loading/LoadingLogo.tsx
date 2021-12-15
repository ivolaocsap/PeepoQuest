import React from 'react';
import styled from 'styled-components';

type LoadingLogoProps = {
  width?: string;
  marginTop?: string;
};

export const LoadingLogo: React.FC<LoadingLogoProps> = ({ marginTop, width }) => {
  return (
    <LoadingContainer width={width} marginTop={marginTop}>
      <img src="/burning.gif" />
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div<{ width?: string; marginTop?: string }>`
  text-align: center;
  margin-top: ${({ marginTop }) => marginTop || '50px'};
  img {
    width: ${({ width }) => width || '36px'};
  }
`;
