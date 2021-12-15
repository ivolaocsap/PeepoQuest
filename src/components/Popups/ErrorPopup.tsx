import React from 'react';
import { AlertCircle } from 'react-feather';
import styled from 'styled-components';
import theme from '../../theme';
import { AutoColumn } from '../Column';
import { AutoRow } from '../Row';

interface ErrorPopupProps {
  title: string;
  message: string;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ title, message }) => {
  return (
    <RowNoFlex>
      <div style={{ paddingRight: 16 }}>
        <AlertCircle color={theme.color.danger} size={24} />
      </div>
      <AutoColumn gap="8px">
        <StyledPopupTitle>{title}</StyledPopupTitle>
        <StyledPopupMessage>{message}</StyledPopupMessage>
      </AutoColumn>
    </RowNoFlex>
  );
};

const RowNoFlex = styled(AutoRow)`
  flex-wrap: nowrap;
`;

const StyledPopupTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.color.primary.main};
`;

const StyledPopupMessage = styled.span`
  color: ${(props) => props.theme.color.grey[750]};
  font-size: 14px;
`;

export default ErrorPopup;
