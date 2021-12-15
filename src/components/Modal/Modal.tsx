import React from 'react';
import styled from 'styled-components';
import Card from '../Card';

import Container from '../Container';

export interface ModalProps {
  onDismiss?: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  padding?: string;
  background?: string;
}

const Modal: React.FC<ModalProps> = ({ children, size, padding, background }) => {
  return (
    <Card width="auto" padding={padding} background={background}>
      <StyledModal>{children}</StyledModal>
    </Card>
  );
};

const StyledModal = styled.div`
  position: relative;
`;

export default Modal;
