import React, { useEffect, useRef, useMemo, useCallback, useState, MouseEvent } from 'react';
import Container from 'src/components/Container';
import styled, { keyframes, DefaultTheme } from 'styled-components';
import { BigNumber } from '@ethersproject/bignumber';
import theme from 'src/theme';
import { useSpring, animated } from 'react-spring';
import icDiamondChest from 'src/assets/img/mim.svg';
import { useTokenBalance } from 'src/contexts/AccountBalanceProvider/AccountBalanceProvider';
import useApprove, { ApprovalState } from 'src/hooks/useApprove';
import useDiamondHand from 'src/hooks/useDiamondHand';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';
import rpgcharacter0 from 'src/assets/img/rpg/peasent.png';
import rpgcharacter1 from 'src/assets/img/rpg/kight.png';
import rpgcharacter2 from 'src/assets/img/rpg/rpg3.gif';
import rpgcharacter3 from 'src/assets/img/rpg/rpg2.gif';
import dragon from 'src/assets/img/rpg/dragon.png';
import ERC20 from 'src/diamondhand/ERC20';
import useTryConnect from 'src/hooks/useTryConnect';
import useHandleTransactionReceipt from 'src/hooks/useHandleTransactionReceipt';
import { useWeb3React } from '@web3-react/core';

const UserStats: React.FC = () => {
  enum ButtonStatus {
    notConnected = 1,
    insufficient = 2,
    requireApproval = 3,
    approvalPending = 4,
    paused = 15,
    ready = 20,
    notEnough = 21,
  }
  const [mouse, setmouse] = useState<boolean>(false);
  const [mouse1, setmouse1] = useState<boolean>(false);

  const [active, setactive] = useState<boolean>(false);
  const [xy, setxy] = useState<any>(0);
  const [y, setscroll] = useState<number>(0);
  const [z, setscrolltop] = useState<number>(0);
  const [RpgPlayer, setRpgPlayer] = useState<number>(0);

  const images = [rpgcharacter0, rpgcharacter1, rpgcharacter2, rpgcharacter3];
  const names = ['Peasent Pepe', 'Knight Pepe', 'Druid Pepe', 'Wizard Pepe'];
  const texts = [
    <ol>
      <li>Peepo can´t own land :c</li>
      <li>will probably lose battles</li>
      <li>Jeet certified</li>
    </ol>,
    <ol>
      <li>Peepo can own land </li>
      <li>can't collect land taxes</li>
      <li>still litle jeet</li>
    </ol>,
    <ol>
      <li>Peepo can own land </li>
      <li>can collect land taxes</li>
      <li>Degen Approved</li>
    </ol>,
    <ol>
      <li>Peepo can do everything </li>
      <li>Perform MagiK rituals</li>
      <li>Degen Only</li>
    </ol>,
  ];

  const prices = ['36', '72', '144', '432'];

  const attack = ['3000', '900', '600', '144'];
  const defense = ['3000', '900', '600', '144'];
  const diamondHand = useDiamondHand();
  const config = useConfiguration();
  const { tryConnect } = useTryConnect();
  const { account } = useWeb3React();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const [token, setToken] = useState<ERC20 | undefined>();
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
  useEffect(() => {
    if (!diamondHand || token) return;
    setToken(diamondHand.PEEPOQUEST);
  }, [diamondHand, token]);

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

    if (balance && balance.lt(prices[RpgPlayer])) {
      return ButtonStatus.notEnough;
    }

    return ButtonStatus.ready;
  }, [approvalTokenState, account, prices[RpgPlayer], balance]);

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
        return 'Mint';
    }
  }, [status, token]);

  const buy = useCallback(async () => {
    try {
      const tx = await handleTransactionReceipt(
        diamondHand?.NFT.mint(account, RpgPlayer, BigNumber.from(3)),
        `Mint My Hero`,
      );
      if (tx && tx.response) {
        await tx.response.wait();
        tx.hideModal();
      }
    } catch {
      //
    }
  }, [account, RpgPlayer, diamondHand?.NFT, handleTransactionReceipt]);

  const onClickBuy = useCallback(async () => {
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
        buy();
        break;
    }
  }, [status, tryConnect, approveToken, buy]);

  function handleLeftclick() {
    if (RpgPlayer > 0) {
      setRpgPlayer(RpgPlayer - 1);
    } else {
      setRpgPlayer(3);
    }
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

  document.onmousemove = function (e) {
    const mousecoords = getMousePos(e);
    setxy(mousecoords);
  };

  const isMobile = window.innerWidth <= 1000;
  return (
    <CardsBig>
      <ol>
        <li>
          $PQUEST: -- <Mim mobile={isMobile} src={icDiamondChest} />
        </li>
        <li>
          Treasury: 6963 <Mim mobile={isMobile} src={icDiamondChest} />
        </li>
        <li>Burned: -- 🐸</li>
        <li>Total SupplY: 14400 🐸</li>
      </ol>
      Token Stats:
    </CardsBig>
  );
};
const Mim = styled.img<{ mobile?: boolean }>`
  width: 30px;
`;
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
  &:hover {
    transform: scale(1.1);
  }
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

const StyledDoubleCol = styled.div`
  margin-top: 40px;
  display: grid;
  grid-gap: 3vh;
  justify-items: center;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;

  grid-template-columns: repeat(1, 1fr);
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
  list-style-type: square;
  list-style-image: url(bullet.png);
  flex-shrink: 3;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.71);
  backdrop-filter: blur(9px);
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

  display: flex;
  align-items: top;
  justify-content: top;
  align-content: flex-end;

  flex-direction: column-reverse;
  padding: 1vh 1vh 1vh 1vh;
  margin-top: 1vh;
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

export default UserStats;
