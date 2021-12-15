import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import ERC20 from '../diamondhand/ERC20';
import { useWeb3React } from '@web3-react/core';

const useAllowance = (token: ERC20, spender: string, pendingApproval?: boolean) => {
  const [allowance, setAllowance] = useState<BigNumber>(null);
  const { account } = useWeb3React();

  const fetchAllowance = useCallback(async () => {
    const allowance = await token.allowance(account, spender);
    setAllowance(allowance);
  }, [account, spender, token, setAllowance]);

  useEffect(() => {
    if (account && spender && token) {
      fetchAllowance().catch((err) => console.warn(`Failed to fetch allowance: ${err.stack}`));
    }
  }, [account, spender, token, pendingApproval, fetchAllowance]);

  return { allowance, fetchAllowance };
};

export default useAllowance;
