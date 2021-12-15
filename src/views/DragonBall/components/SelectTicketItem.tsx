import React, { useCallback, useMemo } from 'react';
import { TicketItemProp } from 'src/api/models';
import styled, { keyframes } from 'styled-components';
import theme from 'src/theme';
import ImgBallSelected from 'src/assets/img/ball-selected.svg';
import ImgBallNoSelected from 'src/assets/img/ball-no-selected.svg';
import ImgBallPower from 'src/assets/img/ball-power.svg';
import IconRemove from 'src/assets/img/remove.svg';
import { range } from 'src/utils/objects';
import baby from 'src/assets/img/croblades.png';
import baby1 from 'src/assets/img/croblades.png';
import baby2 from 'src/assets/img/croblades.png';
import baby3 from 'src/assets/img/croblades.png';
import baby4 from 'src/assets/img/croblades.png';
import baby5 from 'src/assets/img/croblades.png';
import heart from 'src/assets/img/croblades.png';
import heartgrey from 'src/assets/img/croblades.png';
import card from 'src/assets/img/card.png';

const maxChooseNumber = 4;

const slots = range(0, 4);

interface TicketItemProps {
  index: number;
  ticketItem: TicketItemProp;
  onChange?: (index: number, data: TicketItemProp) => void;
  removeTicket: (index: number) => void;
}

const SelectTicketItem: React.FC<TicketItemProps> = ({
  index,
  ticketItem,
  onChange,
  removeTicket,
}) => {
  const names = ['AppleJack', 'Fluttershy', 'RainbowDash'];
  const imgs = [baby, baby1, baby2, baby3, baby4, baby5];

  const selectid = useCallback(() => {
    onChange(index, {
      ...ticketItem,
      id: ticketItem.id === index ? undefined : index,
    });
  }, [index, onChange, ticketItem]);

  const handleRemove = useCallback(() => {
    removeTicket(index);
  }, [index, removeTicket]);

  const isValid = useMemo(() => {
    return ticketItem && ticketItem.id < 6;
  }, [ticketItem]);

  return (
    <ContainerItem>
      <HeaderStyled active={isValid}>
        <TicketNumberStyled>PeepoQuest #{names[index]}</TicketNumberStyled>
      </HeaderStyled>
      <IconRemoveStyled className="fal fa-minus-circle" onClick={handleRemove}>
        <img src={IconRemove} draggable="false" />
      </IconRemoveStyled>

      <NormalBallContainerStyted>
        <Baby src={imgs[index]} active={isValid} />
        <SelectBumberLabelStyled>Choose one PeepoQuest</SelectBumberLabelStyled>

        <Heart src={isValid ? heart : heartgrey} draggable="false" onClick={selectid} />
      </NormalBallContainerStyted>
    </ContainerItem>
  );
};

const RainbowLight = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const Baby = styled.img<{ active?: boolean }>`
  height: 254px;
  display: block;
  margin-left: auto;
  margin-right: auto;

  filter: blur(5px);
  border-radius: 5px;
  position: relative;
  filter: blur(${({ active }) => (active ? '0px' : '5px')});
  overflow: hidden;
  &:hover {
    animation: ${RainbowLight} 3s linear infinite;
  }
`;

const Heart = styled.img`
  height: 95px;
  display: block;

  left: 30%;

  border-radius: 5px;
  position: relative;

  &:hover {
    animation: ${RainbowLight} 3s linear infinite;
    filter: brightness(1.01);
  }
`;

const ContainerItem = styled.div`
  border: solid 0px #7c7a7a;
  background-color: #15161c;
  border-radius: 5px;
  position: relative;

  overflow: hidden;
`;
const HeaderStyled = styled.div<{ active?: boolean }>`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 8px 12px;
  align-items: flex-start;
  background-color: ${({ active }) => (active ? '#4024d5' : '#16284e')};
`;
const TicketNumberStyled = styled.h3`
  font-weight: 30;
  font-size: 1rem;
  flex: 1;
  margin: 0;
`;

const IconRemoveStyled = styled.div`
  width: 160px;
  height: 16px;
  cursor: pointer;
  left: 90%;
  top: 3%;
  position: absolute;
`;

const NormalBallContainerStyted = styled.div<{ active?: boolean }>`
  padding: 15px 18px;
  border-bottom: dashed 1px ${theme.color.grey[500]};

  background-size: cover;
  &.power {
    border-bottom: none;
  }
`;

const ButtonNumberStyled = styled.div<{ isDisable?: boolean; selected?: boolean }>`
  width: 100%;
  height: 100%;
  font-size: 14px;
  align-items: center;
  display: flex;
  justify-content: center;
  border: solid 0px ${(p) => (p.selected ? '#ff7f33' : '#303030')};
  cursor: ${({ isDisable }) => (!isDisable ? 'pointer' : 'unset')};
  font-weight: ${(p) => (p.selected ? 700 : 400)};
  background-color: ${(p) => (p.selected ? '#ff7f33' : '')};
  border-radius: 3px;

  &:hover {
    ${({ isDisable }) =>
      !isDisable &&
      `
        background-color: #ff7f33;
        font-weight: 700;
        border: solid 0px #ff7f33;
      `}
  }

  &.power {
    &:hover {
      ${({ isDisable }) =>
        !isDisable &&
        `
          background-color: ${theme.color.orange[500]};
        `}
    }
    background-color: ${(p) => (p.selected ? p.theme.color.orange[500] : '')} !important;
  }
`;

const SelectBumberLabelStyled = styled.div`
  font-weight: 600;
  margin-bottom: 9px;
  font-size: 14px;
`;
export default SelectTicketItem;
