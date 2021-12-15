import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface PageProps {
  home?: boolean;
  isHideFooter?: boolean;
  children?: ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return <StyledPage>{children}</StyledPage>;
};

const StyledPage = styled.div<{ home?: boolean }>`
  height: 100%;
`;

export default Page;
