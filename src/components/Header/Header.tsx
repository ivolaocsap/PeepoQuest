import React, { useEffect, useRef, useMemo, useCallback, useState, MouseEvent } from 'react';
import styled from 'styled-components';
import Spacer from '../Spacer';
import AccountButton from './AccountButton';
import ButtonMore from './ButtonMore';
import ButtonSlippage from './ButtonSlippage';
import imgLogo from '../../assets/img/rpg/shield.png';
import logo from '../../assets/img/rpg/logo.png';
import farmLogo from '../../assets/img/farms.png';
import lottoLogo from '../../assets/img/croblades.png';
import { NavLink } from 'react-router-dom';
import ERC20 from 'src/diamondhand/ERC20';
import { useTokenBalance } from 'src/contexts/AccountBalanceProvider/AccountBalanceProvider';
import useDiamondHand from 'src/hooks/useDiamondHand';
import useModal from 'src/hooks/useModal';
import useOutsideClick from 'src/hooks/useClickOutside';
import AccountModal from 'src/views/DragonBall/components/AccountModal';

const Header: React.FC = () => {
  const dh = useDiamondHand();
  const [token, setToken] = useState<ERC20 | undefined>();
  const [whitelisted, setwhite] = useState<boolean>(false);
  const [onPresentAccountModal] = useModal(<AccountModal />);
  const isMobile = window.innerWidth <= 1000;
  const [showed, setShowed] = useState(false);
  const ref = useRef(null);
  useOutsideClick(ref, () => hide());

  const toggle = () => {
    setShowed(!showed);
  };

  const hide = () => {
    setShowed(false);
  };
  console.log(isMobile);
  useEffect(() => {
    if (!dh || token) return;
    setToken(dh.PEEPOQUEST);
  }, [dh, token]);

  const balance = useTokenBalance(token);

  function tooglewhite() {
    if (balance?.gte(0)) {
      setwhite(!whitelisted);
    } else {
      onPresentAccountModal();
    }
  }
  if (isMobile) {
    return (
      <StyledHeader ref={ref}>
        <StyledLeftHeader>
          <LogoLink0 onClick={toggle}>
            <Logo1 src={logo} />
          </LogoLink0>
          <Spacer size="xs" />
        </StyledLeftHeader>
        {showed && (
          <StyledDropdownContent onClick={hide}>
            <StyledDropdownItem target="_blank">
              <LogoLink to="/">Home</LogoLink>
            </StyledDropdownItem>
            <StyledDropdownItem target="_blank">
              <LogoLink to="/farms">Farms</LogoLink>
            </StyledDropdownItem>
            <StyledDropdownItem target="_blank">
              <LogoLink to="/arena">Battle Arena</LogoLink>
            </StyledDropdownItem>
            <StyledDropdownItem target="_blank">
              <LogoLink to="/buy">Market</LogoLink>
            </StyledDropdownItem>
          </StyledDropdownContent>
        )}
        <Spacer size="xs" />
        <AccountButton />
        <ButtonMore />
        <ButtonSlippage />
      </StyledHeader>
    );
  } else {
    return (
      <StyledHeader>
        <StyledLeftHeader>
          <LogoLink1 to="/">PeepoQuest</LogoLink1>
          <Spacer size="xs" />
        </StyledLeftHeader>
        <StyledLeftHeader>
          <LogoLink to="/">Farms</LogoLink>
        </StyledLeftHeader>
        <StyledLeftHeader>
          <LogoLink to="/">Battle Arena</LogoLink>
        </StyledLeftHeader>
        <StyledLeftHeader>
          <LogoLink to="/">Market</LogoLink>
        </StyledLeftHeader>
        <Spacer size="xs" />
        <AccountButton />
        <ButtonMore />
        <ButtonSlippage />
      </StyledHeader>
    );
  }
};
const StyledLeftHeader = styled.div`
  display: flex;
  flex: 1;
  width: 10%;
`;
const StyledDropdown = styled.div`
  position: absolute;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledDropdownContent = styled.div`
  min-width: 9rem;
  border-radius: 25px;
  padding: 0.5rem;
  width: 100px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 2.6rem;
  left: 0rem;
  z-index: 100;

  backdrop-filter: blur(9px);
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);
`;

const StyledDropdownItem = styled.a`
  flex: 1 1 0%;
  align-items: center;
  display: flex;
  padding: 0.5rem;
  text-decoration: none;
  font-size: 20px;
  cursor: pointer;
  font-weight: 500;
  img {
    margin-right: 10px;
    width: 24px;
    text-align: center;
  }
  &:hover {
    background-color: rgba(227, 198, 124, 0.1);
    cursor: pointer;
    text-decoration: none;
  }
`;

const LogoLink = styled(NavLink)`
  text-decoration: none;

  font-size: 18px;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.71);
  text-align: center;
  bottom: 0;
  backdrop-filter: blur(9px);
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: 230px;
  height: 4vmin;
  @media (max-width: 768px) {
    align-items: center;
    display: flex;
  }
  &:hover {
    background-color: rgba(33, 33, 33, 0.71);
    backdrop-filter: blur(9px);
    box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
      inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);
  }
`;

const LogoLink1 = styled(NavLink)`
  text-decoration: none;

  font-size: 42px;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.71);
  text-align: center;
  bottom: 0;
  backdrop-filter: blur(9px);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: 936px;
  height: 12vmin;

  @media (max-width: 400px) {
    align-items: center;
    display: flex;
  }
`;
const LogoLink0 = styled.div`
  text-decoration: none;
  position: relative;
  font-size: 42px;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.71);
  text-align: left;
  top: 0;
  right: 0;
  backdrop-filter: blur(9px);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: 936px;
  height: 12vmin;

  @media (max-width: 400px) {
    align-items: center;
    display: flex;
  }
`;
const Logo = styled.img`
  align-self: flex-start;
  height: 90px;
  &:hover {
    filter: brightness(1.08);
  }
  @media (max-width: 100px) {
    height: 15px;
    align-items: center;
  }
`;
const Logo1 = styled.img`
  align-self: flex-start;
  position: absolute;
  top: 0px;
  height: 60px;
  &:hover {
    filter: brightness(1.08);
  }
  @media (max-width: 100px) {
    height: 15px;
    align-items: center;
  }
`;
const Logohover = styled.img`
  align-self: flex-start;
  height: 144px;
  @media (max-width: 568px) {
    height: 150px;
    align-items: center;
  }
`;
const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;
`;

export default Header;
