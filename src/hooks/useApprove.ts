import { BigNumber } from '@ethersproject/bignumber';
import { MaxUint256 } from '@ethersproject/constants';
import { useCallback, useMemo, useState } from 'react';
import ERC20 from '../diamondhand/ERC20';
import { useHasPendingApproval } from '../state/transactions/hooks';
import useAllowance from './useAllowance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const APPROVE_AMOUNT = MaxUint256;
const APPROVE_BASE_AMOUNT = BigNumber.from('1000000000000000000000000');

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
function useApprove(
  token: ERC20,
  spender: string,
): [ApprovalState, () => Promise<void>, () => Promise<void>] {
  const pendingApproval = useHasPendingApproval(token?.address, spender);
  const { allowance: currentAllowance, fetchAllowance: refreshAllowance } = useAllowance(
    token,
    spender,
    pendingApproval,
  );
  const [approvalRequested, setApprovalRequested] = useState(false);

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!currentAllowance) {
      return ApprovalState.UNKNOWN;
    }

    if (approvalRequested) {
      return pendingApproval ? ApprovalState.PENDING : ApprovalState.APPROVED;
    }

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lt(APPROVE_BASE_AMOUNT)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [approvalRequested, currentAllowance, pendingApproval]);

  const handleTransactionReceipt = useHandleTransactionReceipt();

  const approve = useCallback(async (): Promise<void> => {
    console.log(spender, approvalState);
    if (approvalState === ApprovalState.PENDING || approvalState === ApprovalState.APPROVED) {
      console.error('approve was called unnecessarily');
      return;
    }
    try {
      await handleTransactionReceipt(
        token.approve(spender, APPROVE_AMOUNT),
        `Approve ${token.symbol}`,
        {
          approval: {
            spender: spender,
            tokenAddress: token.address,
          },
        },
      );
      setApprovalRequested(true);
    } catch {
      setApprovalRequested(false);
    }
  }, [approvalState, handleTransactionReceipt, token, spender]);

  const refresh = useCallback(async () => {
    await refreshAllowance();
  }, [refreshAllowance]);

  return [approvalState, approve, refresh];
}

export default useApprove;
