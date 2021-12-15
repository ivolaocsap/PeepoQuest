import React, { useCallback, useState } from 'react';
import Modal, {
  ModalCloseButton,
  ModalHeader,
  ModalProps,
  ModalTitle,
} from 'src/components/Modal';
import styled from 'styled-components';
import TokenInput from 'src/components/StringInput';
import useDiamondHand from 'src/hooks/useDiamondHand';
import { FormRow, FormToken } from 'src/components/Form';
import TokenSymbol from 'src/components/TokenSymbol';
import Number from 'src/components/Number';
import { BigNumber } from '@ethersproject/bignumber';
import { useTokenBalance } from 'src/contexts/AccountBalanceProvider/AccountBalanceProvider';
import { ButtonStake } from './ButtonStake';
import icDiamondChest from '../../assets/img/mim.svg';

export type ModalStakeProps = ModalProps & {
  token?: string;
};

export const ModalStake: React.FC<ModalStakeProps> = ({ onDismiss, token }) => {
  const diamondHand = useDiamondHand();
  const [stakeAmount, setStakeAmount] = useState<BigNumber>(BigNumber.from(0));
  const shareBalance = useTokenBalance(diamondHand?.PEEPOQUEST);

  const updateShareAmount = useCallback((ev) => {
    setStakeAmount(ev);
    console.log(stakeAmount);
  }, []);

  return (
    <Modal size="md" padding="0">
      <ModalHeader>
        <ModalTitle>{`magiK Faucet- input 1 Mim get 2 Mims`}</ModalTitle>
        <ModalCloseButton onClick={onDismiss}>
          <i className="far fa-times"></i>
        </ModalCloseButton>
      </ModalHeader>
      <ModalContent>
        <FormRowLeftTitle>
          Sacrifice your MIM {'   '}
          <div className="image">
            <img src={icDiamondChest} />
          </div>
        </FormRowLeftTitle>
        <FormRow>
          <div className="row-input">
            <TokenInput
              hasError={false}
              token={diamondHand?.PEEPOQUEST}
              decimals={18}
              precision={6}
              onChange={updateShareAmount}
            />
          </div>
        </FormRow>

        <FormRowLeftTitle>
          Max 5.55 Mim per player {'   '}
          <div className="group-button">
            <ButtonStake amount={stakeAmount} />
          </div>
        </FormRowLeftTitle>
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled.div`
  padding: 32px;
  .group-button {
    margin-top: 33px;
    justify-content: flex-end;
    display: flex;
  }
`;

const FormRowLeftTitle = styled.div`
  font-size: 0.7rem;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  margin-bottom: 18px;
  color: ${({ theme }) => theme.color.primary.light};
  display: flex;
  align-items: center;
  white-space: pre;
  .image {
    height: 50px;
    margin-right: 10px;
  }
`;

export const ButtonCancel = styled.button`
  padding: 0 15px;
  text-align: center;
  outline: none;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  border: none;
  margin-right: 20px;
  background: none;
  color: ${({ theme }) => theme.color.primary.main};
  &:hover {
    color: ${({ theme }) => theme.color.green[100]};
  }
`;
