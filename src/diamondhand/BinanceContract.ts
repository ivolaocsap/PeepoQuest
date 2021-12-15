import { Contract, ContractFunction, ContractInterface } from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/providers';
import { defineReadOnly } from '@ethersproject/properties';
import { FunctionFragment } from '@ethersproject/abi';

function buildSafeCall(contract: Contract, signature: string, fragment: FunctionFragment) {
  if (fragment.constant) {
    // keep view function as is
    return (...args: any) => contract[signature](...args);
  }
  return async (...args: any[]) => {
    return contract.estimateGas[signature](...args)
      .then(() => contract[signature](...args))
      .catch((estimateError) => {
        if (
          estimateError?.code === -32603 &&
          estimateError?.data?.message?.includes('always failing transaction')
        ) {
          // extract real error code
          return contract.callStatic[signature](...args)
            .then(() => {
              console.log('????');
            })
            .catch((callError) => {
              throw callError;
            });
        }
        throw estimateError;
      });
  };
}

export class BinanceContract extends Contract {
  safeCall: Record<string, ContractFunction> = {};

  constructor(
    addressOrName: string,
    contractInterface: ContractInterface,
    protected signerOrProvider?: Signer | Provider,
  ) {
    super(addressOrName, contractInterface, signerOrProvider);
    Object.keys(this.interface.functions).forEach((signature) => {
      const fragment = this.interface.functions[signature];
      defineReadOnly(this.safeCall, fragment.name, buildSafeCall(this, signature, fragment));
    });
  }
}
