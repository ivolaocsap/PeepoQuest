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

const Metaverse: React.FC = () => {
  const dh = useDiamondHand();
  const [contracts, setContracts] = useState<ContractLink[]>([]);
  const config = useConfiguration();
  console.log(config);
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
  const [input, setInput] = useState<string>('');
  const isInputValid = (inputValue: string) => {
    if (isNaN(+inputValue)) {
      return false;
    }
    if (inputValue === undefined) {
      return false;
    }

    return true;
  };
  const broadcast = (_value: string) => {
    if (!isInputValid(_value)) {
      return false;
    }
    if (!isNaN(+_value)) {
      setInput(_value);
    }
  };
  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const _value = (event.target as HTMLInputElement).value;
    broadcast(_value);
  };

  return (
    <Page>
      <Container size="lg">
        <PlayerDiv active={false}>
          <Heading>
            <ul>
              <p>HenLo frens to obtain test tokens please verify yourself </p>
              <p></p>
            </ul>
          </Heading>
          <StakeButtonStyled onClick={showStake}>VerifY!</StakeButtonStyled>
        </PlayerDiv>
      </Container>
    </Page>
  );
};
const PlayerDiv = styled.div<{ active?: boolean }>`
  position: absolute;

  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.71);
  backdrop-filter: blur(9px);
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-family: 'Times New Roman', Times, serif;
  padding: 10px 5;
  text-transform: uppercase;
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  left: 36%;
  top: 40%;
  width: 33%;
  height: 33%;
`;
const StyledTokenInput = styled.input<{ hasError?: boolean }>`
  color: ${({ theme, hasError }) =>
    hasError ? theme.color.red[500] : theme.color.primary.light};
  width: 0px;
  position: relative;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: transparent;
  font-size: 32px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  appearance: textfield;
  font-family: ${({ theme }) => theme.font.monospace};
  font-weight: bold;
`;
const StyledTokenInputWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 0vh;
  bottom: 0vh;
  flex-flow: row nowrap;
  align-items: center;
  margin-right: 10px;
  flex: 1;
`;
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
position: relative;
  width:100%
  display: flex;
  position: absolute;
  background-color: rgba(144, 144, 144, 0.15);
border-radius: 25ps;

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
  color: none;
  border: 0px;
  text-align: center;
  width: 150px;
  height: 50px;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  z-index: 6;
  position: absolute;
  overflow: hidden;
  position: absolute;
  left: 36%;
  top: 10%;
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
    box-shadow: 0 0 10px 3px #e7d58b, 0 0 13px 6px rgba(0, 0, 0, 0.71),
      0 0 21px 15px rgba(0, 0, 0, 0.31);

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
  position: sticky;

  background-color: rgba(0, 0, 0, 0.69);
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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

export default Metaverse;
