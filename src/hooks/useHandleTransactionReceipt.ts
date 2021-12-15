import { useCallback } from 'react';
import { TransactionResponse } from '@ethersproject/providers';
import { TransactionCustomData, useTransactionAdder } from '../state/transactions/hooks';
import { useAddPopup } from '../state/application/hooks';
import WaitingApproval from '../components/WaitingApproval';
import useModalWithFC from './useModalWithFC';
import { getErrorMessage } from '../utils/transactionError';
import WaitingApprovalResult from '../components/WaitingApprovalResult';

const useHandleTransactionReceipt = () => {
  const { showModal, hideModal } = useModalWithFC('approval');
  const addTransaction = useTransactionAdder();
  const addPopup = useAddPopup();
  return useCallback(
    async (
      promise: Promise<TransactionResponse>,
      summary: string,
      customData?: TransactionCustomData,
    ) => {
      showModal(WaitingApproval, {
        message: summary,
        onDismiss: hideModal,
      });
      try {
        customData = customData || {};
        const response = await promise;
        showModal(WaitingApprovalResult, {
          onDismiss: hideModal,
          transactionHash: response.hash,
        });
        addTransaction(response, { ...customData, summary });
        return { response, hideModal };
      } catch (err: any) {
        console.warn('Error handled', err);
        hideModal();

        throw err;
      }
    },
    [addTransaction, showModal, hideModal],
  );
};

export default useHandleTransactionReceipt;
