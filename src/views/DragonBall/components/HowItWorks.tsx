import { BigNumber } from '@ethersproject/bignumber';
import React, { useEffect, useMemo, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Box, BoxBody, BoxHeader, BoxTitle } from 'src/components/Box';
import NumberDisplay from 'src/components/Number';
import { ExternalLinks } from 'src/config';
import styled from 'styled-components';
import useDiamondHand from 'src/hooks/useDiamondHand';
import theme from 'src/theme';
import TokenSymbol from 'src/components/TokenSymbol';
import ERC20 from 'src/diamondhand/ERC20';
import scv from 'src/assets/img/scv.png';
interface HowItWorksProps {
  costPerTicket: BigNumber;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ costPerTicket }) => {
  const dh = useDiamondHand();
  const [token, setToken] = useState<ERC20 | undefined>();

  useEffect(() => {
    if (!dh || token) return;
    setToken(dh.PEEPOQUEST);
  }, [dh, token]);
  return (
    <Box>
      <BoxHeader bg="#12161e">
        <BoxTitle>Nft staking How It Works</BoxTitle>
      </BoxHeader>
      <BoxBody>
        <StyledWrapper>
          <StyledItem>
            <StyledOrder>1</StyledOrder>
            <StyledContent>
              The price for NFT's is curently{' '}
              <NumberDisplay
                value={costPerTicket}
                decimals={10}
                precision={0}
                keepZeros={true}
              />{' '}
              PeepoQuest. The price will increase until all of the NFT's are minted #NOFOMO
              <ul>
                You can get them here:
                <Link to="/buy">
                  Get Baby NFT <TokenSymbol size={44} symbol={token?.symbol} />
                </Link>{' '}
                With Our PeepoQuest token.{' '}
                <a href={ExternalLinks.buyPeepoQuest} target="_blank">
                  Buy Here
                </a>{' '}
              </ul>
            </StyledContent>
          </StyledItem>
          <StyledItem>
            <StyledOrder>2</StyledOrder>
            <StyledContent>
              You can buy multiple <Link to="/buy">BabyPonies </Link>and stake them at the{' '}
              <Link to="/farms">Farm</Link> while retaining ownership over the NFT
            </StyledContent>
          </StyledItem>
          <StyledItem>
            <StyledOrder>3</StyledOrder>
            <StyledContent>
              You will earn rewards in our native token based on the amount of Nft's that you
              staked. This is a limited pool and you'll have a minimum guaranted share of the
              pool based on the amount of NFT's minted.
            </StyledContent>
          </StyledItem>
          <StyledItem>
            <StyledOrder lastOrder>4</StyledOrder>
            <StyledContent>
              <div>NFT auction: </div>
              <ul>
                Because you remain the owner of the <Link to="/buy">NFT </Link>you can sell them
                on our partnership Projects:
              </ul>
              <ul>
                <a href={'https://scv.finance/nft'} target="_blank">
                  Scv.finance NFT platform
                  <Scv src={scv} />
                </a>
              </ul>
            </StyledContent>
          </StyledItem>
        </StyledWrapper>
      </BoxBody>
    </Box>
  );
};

const StyledWrapper = styled.div`
  padding: 12px 25px;
  @media (max-width: 768px) {
    padding: 12px 1px;
  }
`;

const StyledItem = styled.div`
  display: flex;
  align-items: start;
  :not(:last-child) {
    padding-bottom: 30px;
  }
  @media (max-width: 768px) {
    min-height: 70px;
    :not(:last-child) {
      padding-bottom: 20px;
    }
  }
`;

const StyledOrder = styled.div<{ lastOrder?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(p) => p.theme.color.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: relative;
  ${({ lastOrder }) =>
    !lastOrder &&
    `:after {
      content: '';
      height: 100px;
      width: 1px;
      border-right: 2px dashed #f2f2f2;
      top: 32px;
      position: absolute;
      @media (max-width: 768px) {
        height: 60px;
      }
    }`}
`;

const Scv = styled.img`
  height: 40px;

  position: relative;
  z-index: 2;
  top: 10px;
`;
const StyledContent = styled.div`
  margin-left: 15px;
  font-weight: 300;
  flex: 1;
  a {
    color: ${(p) => p.theme.color.secondary};
    font-weight: 600;
    &:hover {
      color: ${(p) => p.theme.color.primary.light};
    }
  }
  @media (max-width: 768px) {
    margin-left: 8px;
  }
  ul {
    margin: 0;
  }
`;

export default HowItWorks;
