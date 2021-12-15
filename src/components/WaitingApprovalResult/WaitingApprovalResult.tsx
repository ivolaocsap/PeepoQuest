
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { useConfiguration } from '../../contexts/ConfigProvider/ConfigProvider';
import Modal, { ModalCloseButton, ModalHeader, ModalTitle } from '../Modal';
import { StyledLoaderContainer } from '../WaitingApproval/WaitingApproval';
import { Gif } from '../Gif/Gif';
import { faTimes,faCheckSquare } from "@fortawesome/free-solid-svg-icons";

export interface WaitingApprovalResultProps {
  onDismiss?: () => void;
  transactionHash: string;
}

const WaitingApprovalResult: React.FC<WaitingApprovalResultProps> = ({
  transactionHash,
  onDismiss,
}) => {
  const config = useConfiguration();

  return (
    <Modal size="sm" padding="0">
      <ModalHeader>
        <ModalTitle>Transaction Submitted</ModalTitle>
        <ModalCloseButton onClick={onDismiss}>
          <FontAwesomeIcon icon={faTimes} />
        </ModalCloseButton>
      </ModalHeader>
      <StyledModalContent>
        <StyledLoaderContainer>
          <Gif src="/burning.gif" />
        </StyledLoaderContainer>
        <StyledView href={`${config.etherscanUrl}/tx/${transactionHash}`} target="_blank">
          View on Explorer&nbsp;
          <FontAwesomeIcon icon={faCheckSquare} />
        </StyledView>
        <ButtonAction className="btn btn-success" onClick={onDismiss}>
          Close
        </ButtonAction>
      </StyledModalContent>
    </Modal>
  );
};

const ButtonAction = styled.button`
  height: 48px !important;
`;

const StyledModalContent = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 5px;
  grid-template-rows: 1fr;
  align-items: center;
  padding: 20px 20px 20px 20px;
`;

const StyledView = styled.a`
  font-size: 13px;
  text-align: center;
  font-weight: 400;
  margin-bottom: 20px;
  text-decoration: none !important;
`;

export default WaitingApprovalResult;
