import { BigNumber } from 'ethers';
import React, { useCallback } from 'react';
import Loading from 'src/components/Loading';
import NumberDisplay from 'src/components/Number';
import Spacer from 'src/components/Spacer';
import styled from 'styled-components';
import useMyRoundTicket from '../hooks/useMyRoundTicket';
import LostTicketTable from './LostTicketTable';
import TicketNumber from './TicketNumber';

type TicketClaimProps = {
  isCloseRound?: boolean;
  roundId?: number;
};

const TicketClaim: React.FC<TicketClaimProps> = ({ isCloseRound, roundId }) => {
  const {
    winCount,
    filteredTickets,
    totalClaimable,
    claimReward,
    claimable,
    powerBall,
    winNumbers,
    isCanClaimReward,
    loading,
    claimStatuses,
    loadingClaim,
  } = useMyRoundTicket(roundId);

  const claimed = useCallback(
    (id: BigNumber) => {
      return claimStatuses?.find((c) => c.id === id)?.claimed;
    },
    [claimStatuses],
  );

  return (
    <>
      {isCloseRound && (
        <StyledContainer>
          <div className="title">You have {winCount} winning tickets in this round.</div>
          <div className="total-reward">
            Total Prize:
            <span>
              &nbsp;
              <NumberDisplay value={totalClaimable} decimals={18} precision={0} />
              &nbsp;
            </span>
            <span className="symbol">PeepoQuest</span>
          </div>
          {winCount > 0 && (
            <StyledClaim>
              {filteredTickets?.jackpot?.length > 0 && (
                <StyledWinTicket>
                  <StyledWinTitle>
                    Jackpot:&nbsp;
                    <div className="value">
                      <NumberDisplay value={claimable?.jackpot} decimals={18} precision={2} />{' '}
                      iron
                    </div>
                  </StyledWinTitle>
                  {filteredTickets?.jackpot?.map((item, index) => (
                    <TicketNumber
                      powerBall={isCloseRound ? powerBall : undefined}
                      winNumber={isCloseRound ? winNumbers : undefined}
                      key={index}
                      ticket={item.numbers}
                      claimed={claimed(item.id)}
                    />
                  ))}
                </StyledWinTicket>
              )}
              {filteredTickets?.match4?.length > 0 && (
                <StyledWinTicket>
                  <StyledWinTitle>
                    Match four:&nbsp;
                    <div className="value">
                      <NumberDisplay value={claimable?.match4} decimals={18} precision={2} />{' '}
                      iron
                    </div>
                  </StyledWinTitle>
                  {filteredTickets?.match4?.map((item, index) => (
                    <TicketNumber
                      powerBall={0}
                      winNumber={isCloseRound ? winNumbers : undefined}
                      key={index}
                      ticket={item.numbers}
                      claimed={claimed(item.id)}
                    />
                  ))}
                </StyledWinTicket>
              )}
              {filteredTickets?.match3?.length > 0 && (
                <StyledWinTicket>
                  <StyledWinTitle>
                    Match three:&nbsp;
                    <div className="value">
                      <NumberDisplay value={claimable?.match3} decimals={18} precision={2} />{' '}
                      PeepoQuest
                    </div>
                  </StyledWinTitle>
                  {filteredTickets?.match3?.map((item, index) => (
                    <TicketNumber
                      powerBall={0}
                      winNumber={isCloseRound ? winNumbers : undefined}
                      key={index}
                      ticket={item.numbers}
                      claimed={claimed(item.id)}
                    />
                  ))}
                </StyledWinTicket>
              )}
              <StyledNote>
                Note: A 30% tax rate is applied on the winner’s prize (automatically deducted)
              </StyledNote>
              <Spacer />
              <StyledClaimButton
                disabled={loadingClaim || !isCanClaimReward}
                className="btn"
                onClick={claimReward}
              >
                {loadingClaim && <Loading color="#400003" />}
                {loadingClaim && <Spacer size="sm" />}
                Claim reward
              </StyledClaimButton>
            </StyledClaim>
          )}
        </StyledContainer>
      )}
      <LostTicketTable
        data={filteredTickets?.lost}
        isCloseRound={isCloseRound}
        powerBall={powerBall}
        winNumbers={winNumbers}
        loading={loading}
      />
    </>
  );
};

export default TicketClaim;

const StyledNote = styled.div`
  text-align: center;
  font-size: 14px;
`;

const StyledContainer = styled.div`
  width: 100%;
  margin: 0px 58px;
  padding: 24px 0px;
  flex-direction: column;
  border-top: 1px dashed #d5d5d5;
  .title {
    font-size: 30px;
    background: -webkit-linear-gradient(#e7d58b, #dfb771);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background: -webkit-linear-gradient(#eee, #333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: normal;
    text-align: center;
  }
  .total-reward {
    display: flex;
    justify-content: center;
    align-items: baseline;
    font-size: 30px;
    background: -webkit-linear-gradient(#e7d58b, #dfb771);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    span {
      font-size: 32px;
      font-weight: bold;
      color: #2dfc8b;
    }
    .symbol {
      font-size: 30px;
      background: -webkit-linear-gradient(#e7d58b, #dfb771);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;

const StyledClaim = styled.div`
  margin: 20px 40px 0px 40px;
  padding: 20px 32px 32px 30px;
  border: solid 0px #d5d5d5;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 20px 10px 0px 10px;
  }
`;

const StyledWinTicket = styled.div``;

const StyledWinTitle = styled.div`
  display: flex;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: bold;
  .value {
  }
`;

const StyledClaimButton = styled.button`
  width: 100%;
  height: 50px !important;
  font-size: 20px;
  font-weight: 700;
  padding: 0;
  line-height: 1;
  text-transform: uppercase;
  &:disabled {
    background: #d5d5d5;
    color: #877d7d;
    border-color: #d5d5d5;
    cursor: not-allowed;
  }
`;
