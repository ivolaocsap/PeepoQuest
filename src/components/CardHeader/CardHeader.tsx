import React from 'react';
import styled from 'styled-components';

const CardHeader: React.FC = ({ children }) => {
  return <StyledCardHeader>{children}</StyledCardHeader>;
};

const StyledCardHeader = styled.div`
  flex: 1 1 auto;
  min-height: 1px;
  padding: 0.25rem;
`;

export default CardHeader;
