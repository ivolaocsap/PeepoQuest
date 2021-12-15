import React from 'react';
import styled from 'styled-components';
import ticketGold from '../../../assets/img/ball-selected.svg';
import ticketRed from '../../../assets/img/ball-power.svg';
import ticketSteel from '../../../assets/img/ball-no-selected.svg';
import bgTicket from '../../../assets/img/bg-ticket.svg';

type TicketNumberProps = {
  ticket: number[];
  isDisable?: boolean;
  winNumber?: number[];
  powerBall?: number;
  isSmallSize?: boolean;
  claimed?: boolean;
  lost?: boolean;
};

const TicketNumber: React.FC<TicketNumberProps> = ({
  ticket,
  isDisable,
  winNumber,
  powerBall,
  isSmallSize,
  claimed,
  lost,
}) => {
  return ticket ? (
    <StyledTicketItem isSmallSize={isSmallSize}>
      <StyledTicketNumber
        isSmallSize={isSmallSize}
        isDisable={isDisable || (winNumber && !winNumber.includes(ticket[0]))}
        lost={lost}
      >
        {ticket[0]}
      </StyledTicketNumber>
      <StyledTicketNumber
        isSmallSize={isSmallSize}
        isDisable={isDisable || (winNumber && !winNumber.includes(ticket[1]))}
        lost={lost}
      >
        {ticket[1]}
      </StyledTicketNumber>
      <StyledTicketNumber
        isSmallSize={isSmallSize}
        isDisable={isDisable || (winNumber && !winNumber.includes(ticket[2]))}
        lost={lost}
      >
        {ticket[2]}
      </StyledTicketNumber>
      <StyledTicketNumber
        isSmallSize={isSmallSize}
        isDisable={isDisable || (winNumber && !winNumber.includes(ticket[3]))}
        lost={lost}
      >
        {ticket[3]}
      </StyledTicketNumber>
      <StyledTicketNumber
        isSmallSize={isSmallSize}
        isDisable={isDisable || powerBall === 0 || (powerBall && powerBall !== ticket[4])}
      >
        {ticket[4]}
      </StyledTicketNumber>
      {claimed && <StyledClaimed>Claimed</StyledClaimed>}
    </StyledTicketItem>
  ) : null;
};

export default TicketNumber;

const StyledClaimed = styled.div`
  position: absolute;
  left: -20px;
  top: 15px;
  transform: rotate(-45deg);
  background-color: #ee5626;
  padding: 1px 25px;
  font-size: 10px;
`;

const StyledTicketItem = styled.div<{ isSmallSize?: boolean; claimed?: boolean }>`
  padding: ${({ isSmallSize }) => (isSmallSize ? '10px' : '16px')} 6px;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  justify-items: center;
  align-items: center;
  border-image-source: url(${bgTicket});
  border-image-slice: ${25};
  border-image-repeat: stretch;
  border-image-width: 56px;
  border-style: solid;
  margin-bottom: 20px;
  :last-child {
    margin-bottom: ${({ isSmallSize }) => (isSmallSize ? '0px' : '40px')};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: auto auto auto auto auto;
    padding: ${({ isSmallSize }) => (isSmallSize ? '10px' : '0px')} 6px;
  } ;
`;

const StyledTicketNumber = styled.div<{
  isDisable?: boolean;
  isSmallSize?: boolean;
  lost?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px ${({ isSmallSize }) => (isSmallSize ? '7px' : '20px')};
  width: ${({ isSmallSize }) => (isSmallSize ? '30px' : '70px')};
  height: ${({ isSmallSize }) => (isSmallSize ? '30px' : '70px')};
  font-size: ${({ isSmallSize }) => (isSmallSize ? '16px' : '29px')};
  font-weight: bold;
  color: ${({ isDisable }) => (isDisable ? '#8c8c8b' : '#400003')};
  background-image: url(${({ isDisable }) => (!isDisable ? ticketGold : ticketSteel)});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  &:last-child {
    background-image: url(${({ isDisable }) => (!isDisable ? ticketRed : ticketSteel)});
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 40px;
    margin: 0px 4px;
  }
`;
