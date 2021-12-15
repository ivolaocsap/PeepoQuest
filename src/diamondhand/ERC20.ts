import { BigNumber } from '@ethersproject/bignumber';
import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/abstract-provider';
import { JsonRpcProvider, TransactionResponse } from '@ethersproject/providers';
import { formatUnits } from '@ethersproject/units';
import { getDisplayNumber } from '../utils/formatBN';
import { ContractWrapper } from './ContractWrapper';
import { multicall } from './multicall';

class ERC20 extends ContractWrapper {
  constructor(
    address: string,
    provider: Signer | Provider,
    public symbol: string,
    public decimals = 18,
    abi?: any[],
  ) {
    super(abi || ABI, address, provider);
  }

  async totalSupply(): Promise<BigNumber> {
    return await this.contract.totalSupply();
  }

  async balanceOf(account: string): Promise<BigNumber> {
    return await this.contract.balanceOf(account);
  }

  async transfer(recipient: string, amount: BigNumber): Promise<TransactionResponse> {
    return await this.contract.safeCall.transfer(recipient, amount);
  }

  async allowance(owner: string, spender: string): Promise<BigNumber> {
    return await this.contract.allowance(owner, spender);
  }

  async approve(spender: string, amount: BigNumber): Promise<TransactionResponse> {
    return await this.contract.safeCall.approve(spender, amount);
  }

  async transferFrom(
    sender: string,
    recipient: string,
    amount: BigNumber,
  ): Promise<TransactionResponse> {
    return await this.contract.safeCall.transferFrom(sender, recipient, amount);
  }

  async displayedBalanceOf(account: string): Promise<string> {
    const balance = await this.balanceOf(account);
    return formatUnits(balance, this.decimals);
  }

  async displayedTotalSupply(): Promise<string> {
    const supply = await this.totalSupply();
    return Number(formatUnits(supply, this.decimals)).toFixed(0);
  }

  getDisplayNumber(amount: BigNumber, fractionDigits = 3) {
    return getDisplayNumber(amount, this.decimals, fractionDigits);
  }

  static async multicallTokenBalance(
    provider: JsonRpcProvider,
    multicallAddress: string,
    tokens: string[],
    account: string,
  ) {
    const balances = (await multicall(
      provider,
      multicallAddress,
      tokens.map((token) => {
        return {
          target: token,
          signature: 'balanceOf(address user) view returns (uint256)',
          params: [account],
        };
      }),
    )) as BigNumber[][];

    return tokens.reduce((memo, token, index) => {
      return {
        ...memo,
        [token]: balances[index][0],
      };
    }, {} as Record<string, BigNumber>);
  }
}

export default ERC20;

const ABI = [
  {
    name: 'Approval',
    type: 'event',
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'spender', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
