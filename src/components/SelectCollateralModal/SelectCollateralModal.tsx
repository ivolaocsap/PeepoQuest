import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Modal, {
  ModalBodyNoPadding,
  ModalCloseButton,
  ModalHeader,
  ModalProps,
  ModalTitle,
} from '../Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import theme from '../../theme';
import { BigNumber } from 'ethers';
import ERC20 from 'src/diamondhand/ERC20';
import useDiamondHand from 'src/hooks/useDiamondHand';
import TokenSymbol from '../TokenSymbol';
import Number from '../../components/Number';

interface SelectCollateralModalProps extends ModalProps {
  title?: string;
  current?: ERC20;
  onSelected?: (token: ERC20) => void;
}

interface TokenBalance {
  symbol: string;
  balance: BigNumber;
}

const SelectCollateralModal: React.FC<SelectCollateralModalProps> = ({
  current,
  onDismiss,
  onSelected,
}) => {
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const dh = useDiamondHand();

  const tokens = useMemo(() => {
    if (!dh) return [];
    return dh.getCollateralTokens();
  }, [dh]);

  const getBalance = (collateral: ERC20) => {
    return balances.filter((b) => b.symbol === collateral.symbol)[0]?.balance;
  };

  const fetchBalance = useCallback(
    async (token: ERC20) => {
      if (!dh?.myAccount) {
        return { symbol: token.symbol, balance: BigNumber.from(0) };
      }
      const balance = await token.balanceOf(dh.myAccount);
      return { symbol: token.symbol, balance };
    },
    [dh?.myAccount],
  );

  useEffect(() => {
    if (!tokens) {
      return;
    }
    Promise.all(tokens.map((p) => fetchBalance(p))).then((results) => {
      setBalances(results || []);
    });
  }, [fetchBalance, tokens]);

  const onClick = (token: ERC20) => {
    onSelected(token);
    onDismiss();
  };

  return (
    <Modal size="sm" padding="0">
      <ModalHeader>
        <ModalTitle>
          <StyledTitle>Select token payment</StyledTitle>
        </ModalTitle>
        <ModalCloseButton onClick={onDismiss}>
          <FontAwesomeIcon icon={faTimes} />
        </ModalCloseButton>
      </ModalHeader>
      <ModalBodyNoPadding>
        <TokensContainer>
          {tokens.map((item) => (
            <StyledTokenSelector
              className={current && current.address === item.address ? 'selected' : ''}
              key={item.address}
              onClick={() => onClick(item)}
            >
              <TokenSymbol size={42} symbol={item?.symbol} />
              <StyledTokenSelectorBody>
                <StyledTokenName className="symbol">{item?.symbol}</StyledTokenName>
                <StyledTokenBalance className="number">
                  <Number
                    value={getBalance(item)}
                    decimals={item?.decimals}
                    precision={2}
                    keepZeros={true}
                  />
                </StyledTokenBalance>
              </StyledTokenSelectorBody>
              {current && current.address === item.address ? (
                <i
                  className="fas fa-check-circle"
                  style={{ color: theme.color.primary.main }}
                ></i>
              ) : (
                ''
              )}
            </StyledTokenSelector>
          ))}
        </TokensContainer>
      </ModalBodyNoPadding>
    </Modal>
  );
};

const StyledTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
`;

const TokensContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    display: block;
    margin: 0;
  }
`;

const StyledTokenName = styled.div`
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
`;

const StyledTokenBalance = styled.div`
  color: ${(props) => props.theme.color.secondary};
  font-size: 1rem;
`;

const StyledTokenSelectorBody = styled.div`
  flex: 1;
  margin-left: 15px;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const StyledTokenSelector = styled.div`
  padding: 15px 20px;
  overflow: hidden;
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  display: flex;
  align-items: center;
  flex: 1;
  cursor: pointer;
  transition: ease-in-out 150ms;
  &.selected {
    background-color: #c3c5cb !important;
    .symbol,
    .number {
      color: #fff;
    }
  }
  &:hover {
    background-color: #e0e0e0;
  }
`;

export default SelectCollateralModal;
