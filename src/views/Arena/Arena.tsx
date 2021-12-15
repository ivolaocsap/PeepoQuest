import React, { useEffect, Suspense, useMemo, useCallback, useState, MouseEvent } from 'react';
import styled, { keyframes, DefaultTheme } from 'styled-components';
import { darken } from 'polished';
import TokenSymbol from 'src/components/TokenSymbol';
import { Box, BoxBody, BoxHeader, BoxTitle } from 'src/components/Box';
import Container from 'src/components/Container';
import Page from 'src/components/Page';
import Number from 'src/components/Number';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';
import useDiamondHand from 'src/hooks/useDiamondHand';
import useHandleTransactionReceipt from 'src/hooks/useHandleTransactionReceipt';
import ERC20 from 'src/diamondhand/ERC20';
import useApprove, { ApprovalState } from 'src/hooks/useApprove';
import { ModalStake } from './ModalStake';
import useModal from 'src/hooks/useModal';
import Input from 'src/components/Input';
import useTryConnect from 'src/hooks/useTryConnect';
import NumberDisplay from 'src/components/Number';
import { useTokenBalance } from 'src/contexts/AccountBalanceProvider/AccountBalanceProvider';
import { BigNumber } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import Spacer from 'src/components/Spacer';
import { ButtonHarvest } from './ButtonHarvest';
import PlayerData from 'src/hooks/usePlayerData';
import Battle from 'src/hooks/useLastBattle';
import Test from 'src/hooks/useTest';

import rpgcharacter0 from 'src/assets/img/rpg/rpg2.gif';
import rpgcharacter1 from 'src/assets/img/rpg/rpg1.gif';
import rpgcharacter2 from 'src/assets/img/rpg/rpg2.gif';
import rpgcharacter3 from 'src/assets/img/rpg/rpg3.gif';
import chest from 'src/assets/img/rpg/Chest.gif';

interface ContractLink {
  name: string;
  address: string;
}
interface PLAYERDATA {
  vitalPoints1: BigNumber;
  vitalPoints2: BigNumber;
  atackForce1: BigNumber;
  atackForce2: BigNumber;
  char1: number;
  char2: number;
}

const Arena: React.FC = () => {
  enum ButtonStatus {
    notConnected = 1,
    insufficient = 2,
    requireApproval = 3,
    approvalPending = 4,
    paused = 15,
    ready = 20,
    notEnough = 21,
  }

  const dh = useDiamondHand();
  const BOT = '5077750984:AAGBN_vQlVjfBYLll39FxoOSCY46bnTdGPs';

  const images = [rpgcharacter0, rpgcharacter1, rpgcharacter2, rpgcharacter3];
  const [contracts, setContracts] = useState<ContractLink[]>([]);
  const config = useConfiguration();
  const { tryConnect } = useTryConnect();
  const { account } = useWeb3React();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const [percentage, setpercentage] = useState<BigNumber>(BigNumber.from('0'));
  const [token, setToken] = useState<ERC20 | undefined>();
  const [mouse, setmouse] = useState<boolean>(false);
  const [mouse1, setmouse1] = useState<boolean>(false);
  const [battelId, setbattelId] = useState<BigNumber>();
  const [showStake] = useModal(<ModalStake token={token?.symbol} />);
  const [prices, setprice] = useState<BigNumber>(BigNumber.from('0'));
  const [one, setplayer1] = useState<string>(account);
  const [two, setplayer2] = useState<string>(account);
  const [RpgPlayer, setRpgPlayer] = useState<number>(0);
  const { deployments } = config;
  const battleId = Battle();
  const battledata = Test(battelId);
  //const telegram = new Telegram(BOT as string);

  useEffect(() => {
    if (!dh || !battleId) return;
    setbattelId(battleId);
    console.log(battelId);
  }, [dh, battelId, battleId]);

  useEffect(() => {
    if (!dh) return;
    setToken(dh.PEEPOQUEST);
  }, [dh, token]);
  useEffect(() => {
    if (!battledata) return;
    setplayer1(battledata?.player1);
    setplayer2(battledata?.player2);
  }, [battledata, one, two]);

  const playerdata = PlayerData(battelId, two, one);

  useEffect(() => {
    if (!playerdata) return;
  }, [playerdata]);

  //setRpgPlayer(playerdata.char2);

  const balance = useTokenBalance(token);

  const buyAddress = useMemo(() => {
    if (!config) {
      return;
    }
    return config?.addresses?.Nft;
  }, [config]);

  const [approvalTokenState, approveToken] = useApprove(token, buyAddress);
  const status = useMemo(() => {
    if (!account) {
      return ButtonStatus.notConnected;
    }

    if (approvalTokenState == ApprovalState.PENDING) {
      return ButtonStatus.approvalPending;
    }

    if (approvalTokenState !== ApprovalState.APPROVED) {
      return ButtonStatus.requireApproval;
    }

    if (balance && balance.lt(prices)) {
      return ButtonStatus.notEnough;
    }

    return ButtonStatus.ready;
  }, [approvalTokenState, account, prices, balance]);

  const buttonText = useMemo(() => {
    switch (status) {
      case ButtonStatus.notConnected:
        return 'Connect';

      case ButtonStatus.approvalPending:
        return `Approving ${token?.symbol}...`;

      case ButtonStatus.requireApproval:
        return 'Approve';

      case ButtonStatus.notEnough:
        return `Not Enough ${token?.symbol}`;

      default:
        return 'Join Battle';
    }
  }, [status, token]);

  const ButtonConnect = useMemo(() => {
    return (
      <StakeButtonStyled color="primary" onClick={tryConnect}>
        Connect
      </StakeButtonStyled>
    );
  }, [tryConnect]);
  const onClickEnterBattle = useCallback(async () => {
    switch (status) {
      case ButtonStatus.notConnected:
        tryConnect();
        break;
      case ButtonStatus.requireApproval:
        await approveToken();
        break;
      case ButtonStatus.notEnough:
      case ButtonStatus.approvalPending:
        break;
      case ButtonStatus.ready:
        break;
    }
  }, [status, tryConnect, approveToken]);

  const onClickAtack = useCallback(async () => {
    switch (status) {
      case ButtonStatus.notConnected:
        tryConnect();
        break;
      case ButtonStatus.requireApproval:
        await approveToken();
        break;
      case ButtonStatus.notEnough:
      case ButtonStatus.approvalPending:
        break;
      case ButtonStatus.ready:
        break;
    }
  }, [status, tryConnect, approveToken]);
  const handleMouseEvent = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();

    setmouse(!mouse);
  };

  const handleMouseEvent1 = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();

    setmouse1(!mouse1);
  };

  const player1atack = useCallback(async () => {
    try {
      //telegram.sendMessage(1974019706, 'This message was sent without your interaction!');
      const tx = await handleTransactionReceipt(
        dh?.NFT.player1atack(battelId),
        `Player1 Atack`,
      );
      if (tx && tx.response) {
        await tx.response.wait();
        tx.hideModal();
      }
    } catch {
      //
    }
  }, [account, battelId, dh?.NFT, handleTransactionReceipt]);

  const player2atack = useCallback(async () => {
    try {
      const tx = await handleTransactionReceipt(
        dh?.NFT.player2atack(battelId),
        `Player2 Atack`,
      );
      if (tx && tx.response) {
        await tx.response.wait();
        tx.hideModal();
      }
    } catch {
      //
    }
  }, [account, battelId, dh?.NFT, handleTransactionReceipt]);

  const startbattle = useCallback(async () => {
    try {
      const tx = await handleTransactionReceipt(dh?.NFT.startbattle(battelId), `Start Battle`);
      if (tx && tx.response) {
        await tx.response.wait();
        tx.hideModal();
      }
    } catch {
      console.log('kek');
    }
  }, [account, battelId, dh?.NFT, handleTransactionReceipt]);

  const shortenPlayer2 = useMemo(() => {
    if (battledata.player1 && battledata.player1.length > 0) {
      return `${battledata.player1.substring(0, 4)}...${battledata.player1.substring(
        battledata.player1.length - 4,
        battledata.player1.length,
      )}`;
    }
  }, [battledata.player1]);
  const shortenPlayer1 = useMemo(() => {
    if (battledata.player2 && battledata.player2.length > 0) {
      return `${battledata.player2.substring(0, 4)}...${battledata.player2.substring(
        battledata.player2.length - 4,
        battledata.player2.length,
      )}`;
    }
  }, [battledata.player2]);

  return (
    <Page>
      <Container size="homepage">
        <PlayerDiv active={true}>
          <PlayerStats>
            <ul>
              Player2:{shortenPlayer1}
              <p>
                Atack:
                <Number
                  value={playerdata?.atackForce1}
                  decimals={dh?.PEEPOQUEST.decimals}
                  precision={2}
                />
              </p>
              <p>
                Lifepoints:
                <Number
                  value={playerdata?.vitalPoints1}
                  decimals={dh?.PEEPOQUEST.decimals}
                  precision={2}
                />
              </p>
            </ul>{' '}
          </PlayerStats>

          <Player active={true}>
            <Rpgplayer src={images[0]} active={true} />
          </Player>

          <ApproveButtonStyled
            active={false}
            type="button"
            className={
              status == ButtonStatus.notEnough
                ? 'btn btn-success not-enough'
                : 'btn btn-success'
            }
            onClick={onClickEnterBattle}
          >
            {buttonText}
          </ApproveButtonStyled>
          <ApproveButtonStyled
            active={true}
            type="button"
            className={
              status == ButtonStatus.notEnough
                ? 'btn btn-success not-enough'
                : 'btn btn-success'
            }
            onClick={player2atack}
          >
            Atack
          </ApproveButtonStyled>
        </PlayerDiv>

        <StartBattle
          active={true}
          type="button"
          className={
            status == ButtonStatus.notEnough ? 'btn btn-success not-enough' : 'btn btn-success'
          }
          onClick={startbattle}
        >
          Start Battle
        </StartBattle>

        <PlayerDiv active={false}>
          <ul>
            Player1:{shortenPlayer2}
            <p>
              atack:
              <Number
                value={playerdata?.atackForce2}
                decimals={dh?.PEEPOQUEST.decimals}
                precision={2}
              />
              <ApproveButtonStyled
                active={true}
                type="button"
                className={
                  status == ButtonStatus.notEnough
                    ? 'btn btn-success not-enough'
                    : 'btn btn-success'
                }
                onClick={player1atack}
              >
                Atack
              </ApproveButtonStyled>
            </p>
            <p>
              Lifepoints:
              <Number
                value={playerdata?.vitalPoints2}
                decimals={dh?.PEEPOQUEST.decimals}
                precision={2}
              />
            </p>
          </ul>
          <Player active={true}>
            <Rpgplayer src={images[1]} active={true} />
          </Player>

          <ApproveButtonStyled
            active={false}
            type="button"
            className={
              status == ButtonStatus.notEnough
                ? 'btn btn-success not-enough'
                : 'btn btn-success'
            }
            onClick={onClickEnterBattle}
          >
            {buttonText}
          </ApproveButtonStyled>
        </PlayerDiv>
      </Container>
      <Chest active={true}>
        <Chestimg src={chest} active={true} />

        <OpenChest
          active={true}
          type="button"
          className={
            status == ButtonStatus.notEnough ? 'btn btn-success not-enough' : 'btn btn-success'
          }
          onClick={startbattle}
        >
          Open Chest
        </OpenChest>
      </Chest>
    </Page>
  );
};
const PlayerStats = styled.div`
  postition: absolute;
  bottom: 0;
  font-family: 'Times New Roman', Times, serif;
`;
const StartBattle = styled.button<{ active?: boolean }>`
  position: absolute;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  text-align: center;
  width: ${({ active }) => (active ? '220px' : '200px;')};
  height: 50px;

  margin-left: auto;
  margin-right: auto;

  left: ${({ active }) => (active ? '45%' : '20%;')};
  top: ${({ active }) => (active ? '20%' : '50%;')};
  position: absolute;
  overflow: hidden;
  border: solid 0px;
  font-size: 18px;
  background-image: linear-gradient(270deg);
  background-size: 400% 400%;

  &::after {
    content: '';
    display: block;
    position: absolute;
    background: rgba(255, 255, 255, 0.2);
    width: 30px;
    height: 100%;
    top: 0;
    border-radius: 10px;
    filter: blur(5px);
    transform: translateX(-100px) skewX(-15deg);
  }

  &:hover {
    background-image: linear-gradient(to left, #2d8fe5, #d155b8);
    transform: scale(1.05);
    cursor: pointer;

    &::before,
    &::after {
      transform: translateX(300px) skewX(-15deg);
      transition: 0.7s;
    }
  }
`;
const OpenChest = styled.button<{ active?: boolean }>`
  position: absolute;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  text-align: center;
  width: ${({ active }) => (active ? '220px' : '200px;')};
  height: 50px;

  left: ${({ active }) => (active ? '2rem' : '20%;')};
  bottom: ${({ active }) => (active ? '1rem' : '50%;')};
  position: absolute;
  overflow: hidden;
  border: solid 0px;
  font-size: 18px;
  background-image: linear-gradient(270deg);
  background-size: 400% 400%;

  &::after {
    content: '';
    display: block;
    position: absolute;
    background: rgba(255, 255, 255, 0.2);
    width: 30px;
    height: 100%;
    top: 0;
    border-radius: 10px;
    filter: blur(5px);
    transform: translateX(-100px) skewX(-15deg);
  }

  &:hover {
    background-image: linear-gradient(to left, #2d8fe5, #d155b8);
    transform: scale(1.05);
    cursor: pointer;

    &::before,
    &::after {
      transform: translateX(300px) skewX(-15deg);
      transition: 0.7s;
    }
  }
`;
const Rpgplayer = styled.img<{ active?: boolean }>`
  height: 254px;
  display: block;
  margin-left: auto;
  margin-right: auto;

  filter: blur(5px);
  border-radius: 5px;
  position: absolute;
  bottom: 20%;
  right: 12%;
  filter: blur(${({ active }) => (active ? '0px' : '5px')});
  overflow: hidden;
`;
const Chestimg = styled.img<{ active?: boolean }>`
  height: 154px;
  display: block;

  border-radius: 50%;
  filter: blur(5px);
  border-radius: 25px;
  position: absolute;
  left: 1.5rem;
  top: 3vh;

  background-color: rgba(0, 0, 0, 0.71);
  backdrop-filter: blur(9px);
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

  filter: blur(${({ active }) => (active ? '0px' : '5px')});
  overflow: hidden;
`;
const Chest = styled.div<{ active?: boolean }>`
  position: relative;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.71);
  backdrop-filter: blur(9px);
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

  align-items: flex;
  justify-content: center;

  padding: 10px 0;
  text-transform: uppercase;
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  top: 45vh;
  left: 40vmax;

  width: 12rem;
  height: 12rem;
`;
const ApproveButtonStyled = styled.button<{ active?: boolean }>`
  position: absolute;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  text-align: center;
  width: ${({ active }) => (active ? '100px' : '200px;')};
  height: 50px;

  margin-left: auto;
  margin-right: auto;

  left: ${({ active }) => (active ? '70%' : '20%;')};
  top: ${({ active }) => (active ? '50%' : '50%;')};
  position: absolute;
  overflow: hidden;
  border: solid 0px;
  font-size: 18px;
  background-image: linear-gradient(270deg);
  background-size: 400% 400%;

  &::after {
    content: '';
    display: block;
    position: absolute;
    background: rgba(255, 255, 255, 0.2);
    width: 30px;
    height: 100%;
    top: 0;
    border-radius: 10px;
    filter: blur(5px);
    transform: translateX(-100px) skewX(-15deg);
  }

  &:hover {
    background-image: linear-gradient(to left, #2d8fe5, #d155b8);
    transform: scale(1.05);
    cursor: pointer;

    &::before,
    &::after {
      transform: translateX(300px) skewX(-15deg);
      transition: 0.7s;
    }
  }
`;
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

  right: ${({ active }) => (active ? '5vmin' : '')};
  left: ${({ active }) => (active ? '' : '5vmin')};
  width: 33%;
  height: 75%;
`;
const Player = styled.div<{ active?: boolean }>`
  position: absolute;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.71);
  backdrop-filter: blur(9px);
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

  align-items: center;
  justify-content: center;

  padding: 10px 0;
  text-transform: uppercase;
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  bottom: 60%;
  width: 80%;
  height: 33%;
`;

const StyledCol = styled.div`
  margin-top: 40px;
  display: grid;
  grid-gap: 20px;
  justify-items: center;
  width: 100%;

  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 768px) {
    display: block;
    margin-top: 12px;
  }
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

export default Arena;
