import React from 'react';
import styled from 'styled-components';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';
import { TransactionDetails } from 'src/state/transactions/reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
interface TransactionProps {
  tx: TransactionDetails;
}

const Transaction: React.FC<TransactionProps> = ({ tx }) => {
  const summary = tx.summary;
  const pending = !tx.receipt;
  const success =
    !pending && tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined');
  const config = useConfiguration();

  return (
    <TransactionWrapper>
      <TransactionState
        href={`${config.etherscanUrl}/tx/${tx.hash}`}
        target="_blank"
        pending={pending}
        success={success}
      >
        <TransactionStatusText>{summary ?? tx.hash} ↗</TransactionStatusText>
        <IconWrapper pending={pending} success={success}>
          {pending ? (
            <FontAwesomeIcon icon={faCircleNotch} spin />
          ) : (
            <i className={success ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}></i>
          )}
        </IconWrapper>
      </TransactionState>
    </TransactionWrapper>
  );
};

const TransactionWrapper = styled.div`
  margin-top: 8px;
`;

const TransactionStatusText = styled.div`
  display: flex;
  font-size: 14px;
  color: #e2e2e2;
  align-items: center;
  :hover {
    text-decoration: underline;
  }
`;

const TransactionState = styled.a<{ pending: boolean; success?: boolean }>`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none !important;
`;

const IconWrapper = styled.div<{ pending: boolean; success?: boolean }>`
  color: ${({ pending, success, theme }) =>
    pending ? theme.color.primary : success ? theme.color.green[600] : theme.color.red[300]};
`;

export default Transaction;
