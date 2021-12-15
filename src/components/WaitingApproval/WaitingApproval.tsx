import React from 'react';
import styled from 'styled-components';
import Modal, { ModalCloseButton, ModalHeader, ModalTitle } from '../Modal';
import { Gif } from '../Gif/Gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
export interface WaitingApprovalProps {
  message: string;
  onDismiss?: () => void;
}

const WaitingApproval: React.FC<WaitingApprovalProps> = ({ message, onDismiss }) => {
  return (
    <Modal size="sm" padding="0">
      <ModalHeader>
        <ModalTitle>Wating For Confirmation</ModalTitle>
        <ModalCloseButton onClick={onDismiss}>
          <FontAwesomeIcon icon={faCoffee} />
        </ModalCloseButton>
      </ModalHeader>
      <StyledModalContent>
        <StyledLoaderContainer>
          <Gif src="/burning.gif" />
        </StyledLoaderContainer>
        <StyledMessage>{message}</StyledMessage>
        <StyledHelper>Confirm this transaction in your wallet</StyledHelper>
      </StyledModalContent>
    </Modal>
  );
};

const StyledModalContent = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 5px;
  grid-template-rows: 1fr;
  align-items: center;
  padding: 40px 10px 30px 10px;
`;

export const StyledLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledMessage = styled.div`
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  margin-top: 40px;
`;

const StyledHelper = styled.div`
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-align: center;
  font-weight: 500;
`;

export default WaitingApproval;
