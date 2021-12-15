import React, { useEffect, useRef, useMemo, useCallback, useState, MouseEvent } from 'react';
import Container from 'src/components/Container';
import Page from 'src/components/Page';
import styled, { keyframes, DefaultTheme } from 'styled-components';
import { BigNumber } from '@ethersproject/bignumber';
import theme from 'src/theme';
import { useSpring, animated } from 'react-spring';

import ERC20 from 'src/diamondhand/ERC20';
import useDiamondHand from 'src/hooks/useDiamondHand';
import rpgcharacter0 from 'src/assets/img/rpg/rpg1.gif';
import rpgcharacter1 from 'src/assets/img/rpg/rpg2.gif';
import rpgcharacter2 from 'src/assets/img/rpg/rpg3.gif';
import rpgcharacter3 from 'src/assets/img/rpg/troll.gif';
import chart from 'src/assets/img/rpg/chart.png';
import icTwitter from '../../assets/img/setting/ic-twitter.svg';
import icDiscord from '../../assets/img/setting/ic-discord.png';
import icTelegram from '../../assets/img/setting/ic-telegram.svg';
import twitter from 'src/assets/img/rpg/twitter.png';
import telegram from 'src/assets/img/rpg/telegram.png';
import dragon0 from 'src/assets/img/rpg/dragon.png';
import dragon1 from 'src/assets/img/rpg/dragon1.png';
import setup from 'src/assets/img/rpg/setup.png';
import pepe from 'src/assets/img/rpg/peepo.png';
import contract from 'src/assets/img/rpg/contract.png';
import NumberDisplay from 'src/components/Number';
import useModal from 'src/hooks/useModal';
import AccountModal from './components/AccountModal';
import RPG from './components/DragonBall';
import UserStats from './components/UserStats';
import TokenStats from './components/TokenStats';
import { CountdownClockWithDays } from 'src/components/CountdownClock/CountdownClockWithDay';
import Web3EthContract from 'web3-eth-contract';
import { useTokenBalance } from 'src/contexts/AccountBalanceProvider/AccountBalanceProvider';

import { useWeb3React } from '@web3-react/core';
const DragonBall: React.FC = () => {
  const dh = useDiamondHand();
  const [mouse, setmouse] = useState<boolean>(false);
  const [mouse1, setmouse1] = useState<boolean>(false);
  const [active, setactive] = useState<boolean>(false);
  const [onPresentAccountModal] = useModal(<AccountModal />);
  const [whitelisted, setwhite] = useState<boolean>(false);
  const [xy, setxy] = useState<any>(0);
  const [y, setscroll] = useState<number>(0);
  const [z, setscrolltop] = useState<number>(0);
  const [RpgPlayer, setRpgPlayer] = useState<number>(0);
  const images = [rpgcharacter0, rpgcharacter1, rpgcharacter2, rpgcharacter3];
  const names = ['LOL', 'Kek', 'rpgcharacter2', 'rpgcharacter3'];
  const { chainId } = useWeb3React();
  const dat = new Date(1647932054 * 1000);
  const [token, setToken] = useState<ERC20 | undefined>();

  useEffect(() => {
    if (!dh || token) return;
    setToken(dh.PEEPOQUEST);
  }, [dh, token]);

  const balance = useTokenBalance(token);

  const handleMouseEvent = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();

    setmouse(!mouse);
  };
  const handleMouseEvent1 = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();

    setmouse1(!mouse1);
  };
  const handlescroll = (e: React.UIEvent<HTMLDivElement>) => {
    setscrolltop(getYPosition);

    setscroll(y + 1);
  };

  function toogleMenu() {
    setactive(!active);
  }

  function handleRightclick() {
    if (RpgPlayer < 3) {
      setRpgPlayer(RpgPlayer + 1);
    } else {
      setRpgPlayer(0);
    }
  }

  function getYPosition() {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    return top;
  }
  function getMousePos(e: any) {
    return { x: e.clientX, y: e.clientY };
  }
  document.onscroll = function (e) {
    setscrolltop(getYPosition);
    if (z > 200) {
      setactive(true);
    } else {
      setactive(false);
    }
  };
  function tooglewhite() {
    if (balance?.gte(10)) {
      setwhite(!whitelisted);
    } else {
      onPresentAccountModal();
    }
  }

  document.onmousemove = function (e) {
    const mousecoords = getMousePos(e);
    setxy(mousecoords);
  };
  const isMobile = window.innerWidth <= 1000;

  return (
    <Container size="homepage" onScroll={handlescroll}>
      <TitleCol>
        {!isMobile && <Rpgplayer onClick={tooglewhite} src={dragon0} active={true} />}
        <Title mobile={isMobile}>
          Welcome to PeepoQuests
          <CountdownClockWithDays to={dat} fontSize="32px"></CountdownClockWithDays>
        </Title>
        {!isMobile && <Rpgplayer1 onClick={tooglewhite} src={dragon1} active={true} />}
      </TitleCol>
      <StyledDoubleCol>
        <CardsBig mobile={isMobile}>
          <Social onClick={tooglewhite} src={telegram} active={true} />

          <CardsSmall mobile={isMobile}>
            <StyledDoubleCol>
              <Social
                onClick={() => window.open('https://twitter.com/PepeQuests', '_blank')}
                src={icTwitter}
                active={true}
              />
              <Social
                onClick={() => window.open('https://t.me/PeepoQuests', '_blank')}
                src={icTelegram}
                active={true}
              />
              <Social
                onClick={() => window.open('https://discord.gg/5JtUf8c2', '_blank')}
                src={icDiscord}
                active={true}
              />
            </StyledDoubleCol>
          </CardsSmall>
          <CardsSmall mobile={isMobile}>
            <Text>
              <p>$PQUEST Contract address:</p>

              <li>0x0000000000000000</li>
            </Text>
            <Icon onClick={tooglewhite} src={contract} active={true} />
          </CardsSmall>
        </CardsBig>
        <CardsBig mobile={isMobile}>
          <Social onClick={tooglewhite} src={twitter} active={true} />

          <CardsSmall mobile={isMobile}>
            <ol>
              <li>Play to Earn Metaverse</li>
              <li>Sustainable Farmming</li>
              <li>Protocol Reserves</li>
              <li>Pepe Memes (🐸,🐸)</li>
            </ol>
          </CardsSmall>
          <Social onClick={tooglewhite} src={pepe} active={false} />
        </CardsBig>
        <CardsBig mobile={isMobile}>
          <Social onClick={tooglewhite} src={setup} active={true} />
          <Rpgplayer onClick={tooglewhite} src={chart} active={false} />
        </CardsBig>
      </StyledDoubleCol>
      <CardsBig mobile={isMobile}>
        <StyledDoubleCol mobile={true}>
          <TokenStats />
          <UserStats />
        </StyledDoubleCol>
      </CardsBig>
      <RPG />
    </Container>
  );
};
const Img = styled.img``;
const Dropdown = styled.div`
  position: absolute;
  display: inline-block;
`;
const Glow = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 60%;
  left: 50%;

  &:hover {
    background-color: #fff;
    box-shadow: 0 0 60px 30px #fff, 0 0 100px 60px #f0f, 0 0 140px 90px #0ff;
  }
`;
const rotate = keyframes`
0% { transform: rotate(0deg); }
40% { transform: rotate(3deg); }
75% { transform: rotate(5deg); }
95% { transform: rotate(-5deg); }
100% { transform: rotate(0deg); }
`;

const appear = keyframes`

from { transform: translate(35px);opacity:0 }

to {transform: translate(75px);opacity:1 }

`;
const Fade = styled.div<{ active?: boolean; z: number }>`
  animation: ${({ active }) => (active ? '1.2s' : '0s')};
  ${appear} infinte;
`;
const Up = styled.div`
  font-size: 18px;
  text-transform: uppercase;
`;

const Rpgplayer = styled.img<{ active?: boolean }>`
  width: ${({ active }) => (active ? '60%' : '100%')};
  display: block;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  left: ${({ active }) => (active ? '15vh' : '0%')};

  z-index: 3;
  overflow: hidden;
`;
const Icon = styled.img<{ active?: boolean }>`
  width: ${({ active }) => (active ? '10%' : '100%')};
  display: block;
  margin-left: 10px;
  margin-top: 3vh;
  left: ${({ active }) => (active ? '0%' : '0%')};
  bottom: -1vh;
  z-index: 3;
  overflow: hidden;
  &:hover {
    transform: scale(1.1);
  }
`;
const Text = styled.div`
  font-size: 21px;
  text-align: bottom;
  position: relative;
  bottom: 1vh;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const Social = styled.img<{ active?: boolean }>`
  width: ${({ active }) => (active ? '60%' : '100%')};
  display: block;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  align-self: flex-end;
  left: ${({ active }) => (active ? '0%' : '0%')};
  align-items: flex-end;
  z-index: 3;
  img {
    margin-right: 10px;
    width: 24px;
    text-align: center;
  }
  overflow: hidden;
  &:hover {
    transform: scale(1.1);
  }
`;
const Rpgplayer1 = styled.img<{ active?: boolean }>`
  width: ${({ active }) => (active ? '60%' : '100%')};
  display: block;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  right: 15vh;

  z-index: 3;
  overflow: hidden;
  &:hover {
    transform: scale(1.1);
  }
`;
const TitleCol = styled.div`
  margin-top: 4px;
  display: grid;
  grid-gap: 3vh;
  justify-items: center;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;

  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 768px) {
    display: block;
    margin-top: 12px;
  }
`;
const StyledDoubleCol = styled.div<{ mobile?: boolean }>`
  margin-top: 4px;
  display: grid;
  grid-gap: 3vh;
  justify-items: left;
  width: 100%;
  justify-content: flex-end;
  align-items: ${({ mobile }) => (mobile ? 'flex-start' : 'flex-end')};

  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 768px) {
    display: block;
    margin-top: 12px;
  }
`;

const StyledDiv = styled.div`
  overflow: scroll;
  height: 600px;
  display: grid;
  grid-gap: 20px;
  justify-items: center;
  width: 100%;
`;
const CardsSmall = styled.div<{ mobile?: boolean }>`
  position: relative;
  list-style-type: square;
  list-style-image: url(bullet.png);
  text-transform: lowercase;
  list-style-position: inside;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.71);
  backdrop-filter: blur(9px);
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
  margin: 1vh;
  justify-content: flex-bottom;
  column-gap: 1px;
  font-size: 18px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  right: 0vmax;
  width: ${({ mobile }) => (mobile ? '100%' : '80%')};
  height: 12vh;
`;

const CardsBig = styled.div<{ mobile?: boolean }>`
  position: relative;

  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.71);
  backdrop-filter: blur(9px);
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

  display: flex;
  align-items: center;
  justify-content: center;
  align-content: flex-start;

  flex-direction: column-reverse;
  padding: 3vh 3vh 3vh 3vh;
  margin-top: 3vh;
  text-transform: uppercase;
  font-size: 26px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  left: ${({ mobile }) => (mobile ? '0px' : '0px')};
  width: ${({ mobile }) => (mobile ? '100%' : '100%')};
`;
const Title = styled.div<{ mobile?: boolean }>`
  position: relative;

  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.71);
  backdrop-filter: blur(9px);
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 3vh 3vh 3vh 3vh;
  margin-top: 3vh;
  text-transform: uppercase;
  font-size: 26px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  left: ${({ mobile }) => (mobile ? '0px' : '0px')};
  width: ${({ mobile }) => (mobile ? '100%' : '180%')};
`;
const CardsBig1 = styled.div`
  position: absolute;

  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.71);
  backdrop-filter: blur(9px);
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10px 0;
  text-transform: uppercase;
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  bottom: 25vmax;
  right: 5vmax;
  width: 20%;
  height: 100px;
  &:hover {
    background-color: #fff;

    box-shadow: 0 0 10px 3px #e7d58b, 0 0 13px 6px rgba(0, 0, 0, 0.71),
      0 0 21px 15px rgba(0, 0, 0, 0.31);
  }
`;

const DropDown1 = styled.div<{ active?: boolean; ismobile?: boolean }>`
  position: absolute;
  display: block;
  background-color: rgba(0, 0, 0, 0.71);

  backdrop-filter: blur(9px);
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;

  display: flex;

  align-items: center;
  justify-content: center;
  border-radius: 25px;
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

  padding: 10px 0;
  text-transform: uppercase;
  font-size: 20px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  left: 5vmax;
  height: 100px;
  width: 7vmax;
  @media (max-width: 168px) {
    height: 55px;
  }
  transform: rotate3d(0, 0, 0, 0deg) rotateZ(0deg);
  top: ${({ active }) => (active ? '1000vmax' : '20vmax')};
`;
const DropDown4 = styled.div<{ active?: boolean }>`
  position: absolute;
  display: block;
  background-color: rgba(0, 0, 0, 0.71);

  backdrop-filter: blur(9px);
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;

  display: flex;

  align-items: center;
  justify-content: center;
  border-radius: 25px;
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

  padding: 10px 0;
  text-transform: uppercase;
  font-size: 20px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  left: 13vmax;
  height: 100px;
  width: 10vmax;
  @media (max-width: 168px) {
    height: 55px;
  }
  transform: rotate3d(0, 0, 0, 0deg) rotateZ(0deg);
  top: ${({ active }) => (active ? '1000vmax' : '20vmax')};
`;

const DropDown2 = styled.div<{ active?: boolean }>`
  position: absolute;
  display: block;
  background-color: rgba(0, 0, 0, 0.71);

  backdrop-filter: blur(9px);
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;

  display: flex;

  align-items: center;
  justify-content: center;
  border-radius: 25px;
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

  padding: 10px 0;

  font-size: 20px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: left;
  left: 25vmax;
  height: 45px;
  width: 10vmax;
  @media (max-width: 168px) {
    height: 55px;
  }
  transform: rotate3d(0, 0, 0, 0deg) rotateZ(0deg);
  top: ${({ active }) => (active ? '1000vmax' : '20vmax')};
`;
const DropDown3 = styled.div<{ active?: boolean }>`
  position: absolute;
  display: block;
  background-color: rgba(0, 0, 0, 0.71);

  backdrop-filter: blur(9px);
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;

  display: flex;

  align-items: center;
  justify-content: center;
  border-radius: 25px;
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

  padding: 10px 0;
  text-transform: uppercase;
  font-size: 20px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  left: 25vmax;
  height: 45px;
  width: 10vmax;
  @media (max-width: 168px) {
    height: 55px;
  }
  transform: rotate3d(0, 0, 0, 0deg) rotateZ(0deg);
  top: ${({ active }) => (active ? '1000vmax' : '23.2vmax')};
`;
const DropDown0 = styled.div<{ mobile?: boolean }>`
  position: absolute;
  display: block;
  background-color: rgba(0, 0, 0, 0.71);

  backdrop-filter: blur(9px);
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;

  display: flex;

  align-items: center;
  justify-content: center;
  border-radius: 25px;
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

  padding: 10px 0;
  text-transform: uppercase;
  font-size: 20px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  left: 5vmax;
  height: 100px;
  width: 30vmax;
  bottom: ${({ mobile }) => (mobile ? '40vh' : '70vh')};
  @media (max-width: 168px) {
    height: 55px;
  }
  transform: rotate3d(0, 0, 0, 0deg) rotateZ(0deg);
`;

const StyledCol = styled.div`
  width: 100%;
  height: 100%;
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const Separator = styled.div`
  height: 1px;
  border-top: dashed 3px #303030;
  margin: 30px 0;
`;

export default DragonBall;
