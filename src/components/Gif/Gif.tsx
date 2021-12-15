import React from 'react';
import styled from 'styled-components';

type GifProps = {
  src: string;
  width?: string;
};
export const Gif: React.FC<GifProps> = ({ src, width }) => {
  return (
    <WaitingContainer width={width}>
      <img src={src} />
    </WaitingContainer>
  );
};

const WaitingContainer = styled.div<{ width?: string }>`
  text-align: center;
  img {
    width: ${({ width }) => width || '120px'};
  }
`;
