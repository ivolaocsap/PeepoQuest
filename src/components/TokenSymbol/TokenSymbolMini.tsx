import React from 'react';

import ironLogo from '../../assets/img/tokens/iron.png';
import STEELLogo from '../../assets/img/tokens/STEEL.png';
import ETHLogo from '../../assets/img/tokens/ETH.png';
import ADALogo from '../../assets/img/tokens/ADA.png';
import DOTLogo from '../../assets/img/tokens/DOT.png';
import BNBLogo from 'src/assets/img/tokens/BNB.png';
import WBNBLogo from 'src/assets/img/tokens/WBNB.png';
import DIAMONDLogo from '../../assets/img/tokens/Diamond.png';
import BTCBLogo from '../../assets/img/tokens/BTCB.png';
import dBNBLogo from 'src/assets/img/tokens/DBNB.png';
import dBTCLogo from 'src/assets/img/tokens/DBTC.png';
import dETHLogo from 'src/assets/img/tokens/DETH.png';
import NoLogo from '../../assets/img/no_name.png';
import styled from 'styled-components';

const logosBySymbol: { [title: string]: string } = {
  iron: ironLogo,
  STEEL: STEELLogo,
  ETH: ETHLogo,
  ADA: ADALogo,
  DOT: DOTLogo,
  BNB: BNBLogo,
  WBNB: WBNBLogo,
  BTCB: BTCBLogo,
  dBNB: dBNBLogo,
  dBTC: dBTCLogo,
  DND: DIAMONDLogo,
  NOLOGO: NoLogo,
  dETH: dETHLogo,
};

type TokenSymbolProps = {
  symbol: string;
};

const TokenSymbolMini: React.FC<TokenSymbolProps> = ({ symbol }) => {
  return (
    <StyledBankIconWrapper>
      <img
        src={logosBySymbol[symbol] ? logosBySymbol[symbol] : NoLogo}
        alt={`${symbol} Logo`}
      />
    </StyledBankIconWrapper>
  );
};

const StyledBankIconWrapper = styled.div`
  background-color: transparent;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0;
  img {
    height: 100%;
    width: auto;
  }
`;

export default TokenSymbolMini;
