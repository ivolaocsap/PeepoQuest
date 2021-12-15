import React from 'react';
import { Link } from 'react-router-dom';
import { Box, BoxAction, BoxBody, BoxHeader, BoxTitle } from 'src/components/Box';
import Spacer from 'src/components/Spacer';
import useLotteryInfo from 'src/hooks/useLotteryInfo';
import styled from 'styled-components';
import LastRoundPrizeBox from './LastRoundPrizeBox';
import LastTicketsBox from './LastTicketBox';
import LastWiningNumber from './LastWiningNumber';

interface LastRoundResultsProps {
  lotteryId: number;
}

const LastRoundResults: React.FC<LastRoundResultsProps> = ({ lotteryId }) => {
  const lotteryInfo = useLotteryInfo(lotteryId);

  return (
    <>
      <LastWiningNumber lotteryInfo={lotteryInfo} />
      <Spacer />
      <Box>
        <BoxHeader>
          <BoxTitle>Round {lotteryId}</BoxTitle>
          <BoxAction>
            <StyledLinkHistory>
              <Link to={`/ticket?lotteryId=${lotteryId}`}>View history</Link>
            </StyledLinkHistory>
          </BoxAction>
        </BoxHeader>
        <BoxBody>
          <StyledLastRoundWrapper>
            <LastRoundPrizeBox
              total={lotteryInfo?.prizePool}
              jackpot={lotteryInfo?.prizes[0]}
              matchFour={lotteryInfo?.prizes[1]}
              matchThree={lotteryInfo?.prizes[2]}
              winners={lotteryInfo?.winners}
            ></LastRoundPrizeBox>
            <LastTicketsBox lotteryId={lotteryId}></LastTicketsBox>
          </StyledLastRoundWrapper>
        </BoxBody>
      </Box>
    </>
  );
};

const StyledLinkHistory = styled.div`
  font-size: 14px;
  font-weight: 600;
  a {
    color: #c2c2c2 !important;
    &:hover {
      color: #fff !important;
    }
  }
`;

const StyledLastRoundWrapper = styled.div`
  display: flex;
  @media (max-width: 768px) {
    display: block;
  }
`;

export default LastRoundResults;
