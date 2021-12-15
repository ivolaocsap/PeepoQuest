import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import useOutsideClick from 'src/hooks/useClickOutside';
import useDiamondHand from 'src/hooks/useDiamondHand';
import styled from 'styled-components';
import SlippageControl from './SlippageControl';
import { faCog } from '@fortawesome/free-solid-svg-icons';

interface SlippageControlButtonProps {
  onlyIcon?: boolean;
}

const SlippageControlButton: React.FC<SlippageControlButtonProps> = ({ onlyIcon }) => {
  const [showed, setShowed] = useState(false);
  const diamondHand = useDiamondHand();
  const ref = useRef(null);

  useOutsideClick(ref, () => hide());

  const toggle = () => {
    setShowed(!showed);
  };

  const hide = () => {
    setShowed(false);
  };

  return (
    <StyledDropdown ref={ref}>
      <StyledDropdownToggle onClick={toggle}>
        <StyledButtonIcon noMargin={onlyIcon}>
          <Icon icon={faCog} />
        </StyledButtonIcon>
        {!onlyIcon && `Settings`}
      </StyledDropdownToggle>
      {showed && !!diamondHand && (
        <StyledDropdownContent>
          <SlippageControl />
        </StyledDropdownContent>
      )}
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  position: relative;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`;

const StyledDropdownToggle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.color.primary.light};
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-weight: 500;
`;

const StyledDropdownContent = styled.div`
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 0.86rem;
  position: absolute;
  top: 2.2rem;
  right: 0rem;
  z-index: 100;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 340px;
  }
`;

const StyledButtonIcon = styled.button<{ noMargin?: boolean }>`
  width: 100%;
  border: none;
  margin: 0px;
  height: 35px;
  background-color: transparent;
  padding: ${({ noMargin }) => (noMargin ? '0px' : ' 0.15rem 0.5rem')};
  border-radius: 0.5rem;
  cursor: pointer;
  * {
    display: flex;
    align-items: center;
    stroke: rgb(255, 255, 255, 0.5);
  }
  &:hover,
  &:focus {
    outline: none;
    * {
      stroke: rgb(255, 255, 255, 0.8);
    }
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.color.primary.light};
  font-size: 22px;
`;

export default SlippageControlButton;
