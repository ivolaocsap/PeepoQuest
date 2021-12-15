import React, { useEffect, useMemo, useState } from 'react';
import ERC20 from 'src/diamondhand/ERC20';
import useDiamondHand from 'src/hooks/useDiamondHand';
import styled from 'styled-components';
import TokenSymbol from '../TokenSymbol';
import icDown from '../../assets/img/down.svg';

interface ButtonSelectCollateralProps {
  title?: string;
  onSelected?: (token: ERC20) => void;
  tokenAddress?: string;
}

const ButtonSelectCollateral: React.FC<ButtonSelectCollateralProps> = ({
  onSelected,
  tokenAddress,
}) => {
  const dh = useDiamondHand();
  const [current, setCurrent] = useState<ERC20>();

  useEffect(() => {
    if (!dh || !tokenAddress) {
      return;
    }
    setCurrent(dh?.getTokenByAddress(tokenAddress));
  }, [dh, tokenAddress]);

  const hasMultipleTokens = useMemo(() => {
    return dh?.getCollateralTokens() && dh?.getCollateralTokens()?.length > 0;
  }, [dh]);

  useEffect(() => {
    if (onSelected) {
      onSelected(current);
    }
  }, [current, onSelected]);

  return (
    <StyledButton blank={!current} enabled={hasMultipleTokens}>
      {current ? (
        <StyledToken>
          <TokenSymbol size={32} symbol={current?.symbol}></TokenSymbol>
          <span className="symbol">{current?.symbol}</span>
        </StyledToken>
      ) : (
        <StyledToken>
          Token
          <img className="down" src={icDown} />
        </StyledToken>
      )}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ blank?: boolean; enabled?: boolean }>`
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: normal;
  border: none;
  background-color: transparent;
  color: #fff;
  margin-right: 10px;
`;

const StyledToken = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 5px 0px;
  height: 41.2px;
  .symbol {
    margin-left: 5px;
    font-size: 30px;
    background: -webkit-linear-gradient(#e7d58b, #dfb771);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background: -webkit-linear-gradient(#eee, #333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 600;
    font-family: ${({ theme }) => theme.font.monospace};
  }
  img.down {
    margin-left: 5px;
  }
`;

export default ButtonSelectCollateral;
