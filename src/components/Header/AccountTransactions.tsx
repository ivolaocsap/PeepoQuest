import React, { useMemo } from 'react';
import {
  isTransactionRecent,
  useAllTransactions,
  useClearAllTransactions,
} from 'src/state/transactions/hooks';
import { TransactionDetails } from 'src/state/transactions/reducer';
import styled from 'styled-components';
import Transaction from './Transaction';

const MAX_TRANSACTION_HISTORY = 10;

const AccountTransactions: React.FC = () => {
  const allTransactions = useAllTransactions();
  const { clearAllTransactions } = useClearAllTransactions();
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
  }, [allTransactions]);
  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt);
  const confirmed = sortedRecentTransactions
    .filter((tx) => tx.receipt)
    .slice(0, MAX_TRANSACTION_HISTORY);

  const isEmpty = confirmed?.length + pending?.length == 0;
  return (
    <StyledTransactions>
      {isEmpty && <TransactionTitle>Your transactions will appear here...</TransactionTitle>}
      {!isEmpty && (
        <>
          <TransactionHeader>
            <TransactionTitle>Recent transactions</TransactionTitle>
            <StyledTransactionActions onClick={clearAllTransactions}>
              <span style={{ marginLeft: '5px' }}>Clear all</span>
            </StyledTransactionActions>
          </TransactionHeader>

          <StyledTransactionList>
            {pending?.length > 0 && pending.map((tx) => <Transaction key={tx.hash} tx={tx} />)}
            {confirmed?.length > 0 &&
              confirmed.map((tx) => <Transaction key={tx.hash} tx={tx} />)}
          </StyledTransactionList>
        </>
      )}
    </StyledTransactions>
  );
};

const StyledTransactions = styled.div`
  padding: 21px 28px;
  background: #1a1e22;
  margin-top: -1px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const TransactionHeader = styled.div`
  display: flex;
  align-items: center;
`;

const TransactionTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const StyledTransactionList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTransactionActions = styled.button`
  padding: 0px;
  margin-left: auto;
  background-color: transparent;
  appearance: none;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 13px;
  font-family: ${({ theme }) => theme.font.sans};
  font-weight: 500;
  &:hover {
    color: ${(props) => props.theme.color.green[100]};
  }
`;

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime;
}

export default AccountTransactions;
