import React from 'react';
import styled from 'styled-components';
import { useLoading } from '../../state/application/hooks';
import { LoadingLogo } from './LoadingLogo';

const LoadingModal: React.FC = () => {
  const loading = useLoading();
  return (
    loading && (
      <StyledLoading>
        <LoadingLogo />
      </StyledLoading>
    )
  );
};
export default LoadingModal;

const StyledLoading = styled.div`
  position: absolute;
  left: 50%;
  right: 50%;
  top: 50%;
  bottom: 50%;
`;
