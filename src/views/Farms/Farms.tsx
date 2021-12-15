import React, { useEffect, useMemo, useState, MouseEvent } from 'react';
import styled, { keyframes, DefaultTheme } from 'styled-components';
import { darken } from 'polished';
import TokenSymbol from 'src/components/TokenSymbol';
import { Box, BoxBody, BoxHeader, BoxTitle } from 'src/components/Box';
import Container from 'src/components/Container';
import Page from 'src/components/Page';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';
import useDiamondHand from 'src/hooks/useDiamondHand';
import useHandleTransactionReceipt from 'src/hooks/useHandleTransactionReceipt';
import ERC20 from 'src/diamondhand/ERC20';
import { ModalStake } from './ModalStake';
import useModal from 'src/hooks/useModal';
import Input from 'src/components/Input';
import useTryConnect from 'src/hooks/useTryConnect';
import NumberDisplay from 'src/components/Number';
import { useTokenBalance } from 'src/contexts/AccountBalanceProvider/AccountBalanceProvider';
import { BigNumber } from 'ethers';
import Spacer from 'src/components/Spacer';
import { ButtonHarvest } from './ButtonHarvest';
import { formatSecs } from 'src/utils/formatTime';
import frame from 'src/assets/img/frame.png';
import frame1 from 'src/assets/img/frame1.png';
import ponyfarmer from 'src/assets/img/pony.png';
import ponytalk from 'src/assets/img/ponytalk.png';
import babynft from 'src/assets/img/babynft.png';

interface ContractLink {
  name: string;
  address: string;
}

const Farms: React.FC = () => {
  const dh = useDiamondHand();
  const [contracts, setContracts] = useState<ContractLink[]>([]);
  const config = useConfiguration();
  const { tryConnect } = useTryConnect();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const [percentage, setpercentage] = useState<BigNumber>(BigNumber.from('0'));
  const [token, setToken] = useState<ERC20 | undefined>();
  const [mouse, setmouse] = useState<boolean>(false);
  const [mouse1, setmouse1] = useState<boolean>(false);
  const [showStake] = useModal(<ModalStake token={token?.symbol} />);

  const { deployments } = config;

  useEffect(() => {
    if (!dh || token) return;
    setToken(dh.PEEPOQUEST);
  }, [dh, token]);

  const balance = useTokenBalance(token);

  useEffect(() => {
    if (!balance) return;
    setpercentage(balance.div(1000000));
  }, [balance, percentage]);

  const ButtonConnect = useMemo(() => {
    return (
      <StakeButtonStyled color="primary" onClick={tryConnect}>
        Connect
      </StakeButtonStyled>
    );
  }, [tryConnect]);

  const handleMouseEvent = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();

    setmouse(!mouse);
  };

  const handleMouseEvent1 = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();

    setmouse1(!mouse1);
  };

  return (
    <Page>
      <Container size="lg">
        <FoundryContainer>
          <Heading>
            <HeadingItem>
              <span className="label">APR:</span>
              <span className="value">1080%</span>
            </HeadingItem>

            <HeadingItem>
              <span className="label"> Staked:</span>
              <span className="value">--</span>
            </HeadingItem>
            <HeadingItem>
              <span className="label">TVL:</span>
              <span className="value">
                0 <strong>{token?.symbol}</strong>
              </span>
            </HeadingItem>
          </Heading>

          <Body>
            <div className="content">
              <TokenExpansion>
                <TokenSymbol size={54} symbol={token?.symbol} />
                <div className="text-content">
                  <TokenName>{token?.symbol} </TokenName>
                  <div>
                    Daily APR: <span className="text-value">1.2%</span>{' '}
                  </div>
                </div>
              </TokenExpansion>
            </div>
            <div className="content">
              <Amount color="blue">
                <div className="icon-content">
                  <TokenSymbol size={40} symbol={token?.symbol} noBorder />
                </div>
                <div className="text-content">
                  <div>
                    <strong>
                      <span>Unharvested Rewards:</span>
                    </strong>
                  </div>

                  <div>
                    <span className="value">
                      <NumberDisplay value={BigNumber.from('0')} precision={6} decimals={18} />
                    </span>{' '}
                    <strong>{token?.symbol}</strong>
                  </div>
                  <Spacer />
                  <div>
                    {dh?.myAccount ? (
                      <>
                        <ButtonHarvest amount={BigNumber.from('0')} />
                        &nbsp;&nbsp;
                      </>
                    ) : (
                      ButtonConnect
                    )}
                  </div>
                </div>
              </Amount>

              <Amount color="yellow">
                <div className="icon-content">
                  <TokenSymbol size={40} symbol={token?.symbol} noBorder />
                </div>
                <div className="text-content">
                  <div style={{ whiteSpace: 'nowrap' }}>
                    <span className="value">
                      <NumberDisplay value={balance} precision={6} decimals={18} />
                    </span>{' '}
                    <strong>{token?.symbol}</strong>
                    <div>
                      <span className="info">
                        <>
                          &nbsp;=&nbsp;{' '}
                          <NumberDisplay value={percentage} precision={6} decimals={18} />% of
                          the pool
                        </>
                      </span>
                    </div>
                  </div>
                  <Spacer />
                  <Spacer />
                  <div>
                    {dh?.myAccount ? (
                      <>
                        <StakeButtonStyled onClick={showStake}>Stake</StakeButtonStyled>

                        <InlineButton color="secondary">Unstake</InlineButton>
                      </>
                    ) : (
                      ButtonConnect
                    )}
                  </div>
                </div>
              </Amount>
            </div>
          </Body>
        </FoundryContainer>
      </Container>
    </Page>
  );
};

const Framediv = styled.div`
border-radius: 25px;
position: static;
background: #f5abf7;
width: 10000px
animation: fadeIn 2s;
  margin-top: 1%;
  display: block;


`;
const FoundryContainer = styled.div`
border-radius: 25px;

  width:100%
  display: flex;
  position: absolute;
  background-color: rgba(144, 144, 144, 0.15);

  backdrop-filter: blur(9px);
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

  top: 38%;
  left: 24.3%;
  right: 24.3%;





`;

const rotate = keyframes`
0% { transform: rotate(0deg); }
40% { transform: rotate(3deg); }
75% { transform: rotate(5deg); }
95% { transform: rotate(-5deg); }
100% { transform: rotate(0deg); }
`;

const TransitioningBackground = keyframes`
  0% {
    background-position: 1% 0%;
  }
  50% {
    background-position: 99% 100%;
  }
  100% {
    background-position: 1% 0%;
  }
`;

const StakeButtonStyled = styled.button`
  font-size: 1rem;
  font-weight: 600;
  color: white;
  text-align: center;
  width: 150px;
  height: 50px;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  z-index: 6;
  position: relative;
  overflow: hidden;

  background-image: linear-gradient(
    270deg,
    ${(p) => p.theme.color.secondary},
    ${(p) => p.theme.color.primary.light}
  );
  background-size: 400% 400%;
  animation: ${TransitioningBackground} 10s ease infinite;

  transition: 0.6s;

  &::before {
    content: '';
    display: block;
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    width: 60px;
    height: 100%;
    top: 0;
    filter: blur(30px);
    transform: translateX(-100px) skewX(-15deg);
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    background: rgba(255, 255, 255, 0.2);
    width: 30px;
    height: 100%;
    top: 0;
    filter: blur(5px);
    transform: translateX(-100px) skewX(-15deg);
  }

  &:hover {
    background-image: linear-gradient(to left, ${(p) => p.theme.color.secondary}, #d155b8);
    transform: scale(1.05);
    cursor: pointer;

    &::before,
    &::after {
      transform: translateX(300px) skewX(-15deg);
      transition: 0.7s;
    }
  }
`;

const Pony = styled.img`
  height: 254px;

  display: block;
  position: absolute;
  z-index: 5;

  top: 3%;
  margin-left: 56%;

  &:hover {
    animation: 3.2s ${rotate} infinite;

    margin-left: 56%;
    filter: brightness(1.01);
    transform: scale(1.05);
  }
`;

const Baby = styled.img`
  height: 108px;

  display: block;
  position: absolute;
  z-index: 3;

  top: 15%;
  margin-left: 38%;

  &:hover {
    animation: 3.2s ${rotate} infinite;

    top: 12%;
    filter: brightness(1.01);
  }
`;

const Logo = styled.img`
  height: 800px;

  display: block;
  position: absolute;
  z-index: -1;
  animation: fadeIn 2s;
  left: 22%;
  top: 18%;
`;

const Heading = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  border-top-right-radius: 22px;
  border-top-left-radius: 22px;

  position: sticky;

  background-color: rgba(0, 0, 0, 0.71);

  backdrop-filter: blur(9px);
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

  padding: 10px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const HeadingItem = styled.div`
  font-size: 14px;
  font-weight:500;
  color: color: ${(p) => p.theme.color.orange[450]};
  .value {
    margin-left: 10px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.secondary};
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;

  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  padding: 10px 10px;
  background-color: rgba(0, 0, 0, 0.71);

  backdrop-filter: blur(9px);
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

  .content {
    color: ${(p) => p.theme.color.secondary};
    display: flex;
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      flex-direction: column;
      align-items: center;
    }
  }
  span {
    font-size: 13px;
    text-align: center;
    color: ${({ theme }) => theme.color.red[750]};
  }
  span.foot-note {
    margin-top: 5px;
    color: ${({ theme }) => theme.color.red[600]};
  }
`;

const TokenExpansion = styled.div`
  display: flex;
  width: 36%;
  padding: 16px 5px;
  margin: 0 5px;
  position: relative;
  &:first-child {
    width: 24%;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex: 100%;
    width: 100%;
    &:first-child {
      width: 100%;
    }
  }

  .text-value {
    color: ${(p) => p.theme.color.green[600]};
    font-weight: 600;
  }

  .text-content {
    margin-left: 10px;
    font-weight: 500;
    font-size: 14px;
    color: #5a8f35;
  }
`;

const TokenName = styled.div`
  color: ${(p) => p.theme.color.orange[450]};
  font-weight: 600;
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Amount = styled.div<{ color: 'blue' | 'yellow' }>`
  display: flex;
  align-items: flex-start;
  width: 33.3%;
  padding: 10px 5px;
  margin: 0 5px;
  position: relative;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex: 100%;
    width: 100%;
  }

  &:after {
    z-index: -2;
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${(p) =>
      p.color === 'blue' ? p.theme.color.primary.main : p.theme.color.orange[500]};
    clip-path: polygon(
      15px 0,
      100% 0,
      100% calc(100% - 15px),
      calc(100% - 15px) 100%,
      0 100%,
      0 15px
    );
  }

  &::before {
    z-index: -1;
    content: '';
    position: absolute;
    height: calc(100% - 2px);
    width: calc(100% - 2px);
    top: 1px;
    left: 1px;
    bottom: 1px;
    right: 1px;
    background: ${(p) =>
      p.color === 'blue'
        ? darken(0.5, p.theme.color.primary.main)
        : darken(0.45, p.theme.color.orange[500])};
    clip-path: polygon(
      15px 0,
      100% 0,
      100% calc(100% - 15px),
      calc(100% - 15px) 100%,
      0 100%,
      0 15px
    );
  }

  .text-content {
    margin-left: 10px;
  }

  .icon-content {
    display: flex;
    flex-direction: column;
    p {
      background: ${(p) =>
        p.color === 'blue' ? p.theme.color.orange[400] : p.theme.color.orange[500]};
      margin: 0px;
      padding: 0px;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
    }
  }

  .value {
    color: ${(p) => p.theme.color.secondary};
    font-weight: 600;
    font-size: 20px;
  }

  .info {
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
  }

  strong {
    font-size: 14px;
    color: ${(p) => p.theme.color.grey[750]};
    font-weight: 600;
  }

  span {
    font-size: 13px;
    text-align: center;
    color: ${({ theme }) => theme.color.grey[750]};
  }
`;

const getColor = (
  theme: DefaultTheme,
  color: 'success' | 'primary' | 'danger' | 'secondary',
) => {
  switch (color) {
    case 'primary':
      return theme.color.primary.main;
    case 'success':
      return theme.color.green[600];
    case 'danger':
      return theme.color.red[600];
    case 'secondary':
      return theme.color.secondary;
  }
};

const InlineButton = styled.button<{ color: 'success' | 'primary' | 'danger' | 'secondary' }>`
  padding: 0px 0;
  background-color: transparent;
  font-weight: bold;
  border: none;
  position: absolute;
  margin-left: 10%;
  bottom: 10%;
  color: ${(p) => getColor(p.theme, p.color)};
  display: inline-block;
  cursor: pointer;
  font-family: 'MedievalSharp', cursive;
  text-decoration: underline;
  &:disabled {
    cursor: not-allowed;
    color: ${(p) => getColor(p.theme, 'secondary')};
  }
  &:hover:not(:disabled) {
    color: ${(p) => getColor(p.theme, 'primary')};
  }
`;

export const BoxList = styled.ul`
  list-style: cirle;
  padding-left: 18px;
  margin: 0;
`;
export const BoxListItem = styled.li`
  margin-bottom: 5px;
`;
export const BoxListItemLink = styled.a`
  cursor: pointer;
  border: none;
  padding-left: 0px;
  text-decoration: none;
  color: #e2e2e2;
  &:hover {
    text-decoration: underline;
  }
`;

export const BoxItem = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const StyledButtons = styled.div`
  align-items: center;
  padding: 0 15px 10px;
`;

const StyledInputs = styled.div`
  align-items: center;
  padding: 0 15px 10px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 20px 20px !important;
  margin-top: 15px;
`;

const StyledSelectDateWrapper = styled.div`
  padding: 0 15px 10px;
  .date {
    &:first-child {
      margin-bottom: 20px;
    }
    flex: 1;
    .helper {
      font-size: 13px;
      padding-left: 15px;
      padding-top: 3px;
    }
  }
`;

export default Farms;
