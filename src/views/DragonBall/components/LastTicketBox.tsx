import React from 'react';
import styled from 'styled-components';
import ImgReward from 'src/assets/img/reward.svg';
import { NavLink } from 'react-router-dom';

import NumberDisplay from 'src/components/Number';
import useMyRoundTicket from 'src/views/TicketDetail/hooks/useMyRoundTicket';
import Spacer from 'src/components/Spacer';

const LastTicketsBox: React.FC<{ lotteryId: number }> = ({ lotteryId }) => {
  const { totalClaimable, winCount } = useMyRoundTicket(lotteryId);

  return (
    <StyledWrapper>
      <img className="icon-reward" src={ImgReward} />

      <StyledTotalTicketPrize>
        <div className={'prize-title'}>Total Reward:</div>
        <div className="prize-value">
          <NumberDisplay value={totalClaimable} decimals={18} precision={0} keepZeros={true} />
          <span className="prize-unit">PeepoQuest</span>
        </div>
      </StyledTotalTicketPrize>
      <Spacer />
      <StyledNavLink active="true" to={`/ticket?lotteryId=${lotteryId}`}>
        Check results
      </StyledNavLink>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 12px;
  padding-top: 30px;
  @media (max-width: 768px) {
    width: 100%;
    padding-top: 20px;
  }
`;

const StyledTicketCount = styled.div`
  font-weight: 500;
  font-size: 18px;
  margin-top: 23px;
  @media (max-width: 768px) {
    text-align: center;
    margin-top: 10px;
  }
`;

const StyledTotalTicketPrize = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: flex-end;
  font-size: 20px;
  font-weight: 600;
  .prize-title {
  }
  .prize-value {
    text-transform: uppercase;
    font-weight: 700;
    color: #2dfc8b;
    margin-left: 8px;
  }
  .prize-unit {
    margin-left: 5px;
  }
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const StyledNavLink = styled(NavLink)<{ active?: string }>`
  font-size: 18px;
  font-weight: 600;
  appearance: none;
  background: #a3212a;
  font-family: ${(p) => p.theme.font.heading};

  border-radius: 10px;
  border: solid 0px #a3212a;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  cursor: pointer;
  transition: ease-in-out 100ms;
  text-transform: uppercase;
  &:hover {
    background-color: #6b171d;
    border: solid 0px #6b171d;
  }
`;

export default LastTicketsBox;
