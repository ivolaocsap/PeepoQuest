import React from 'react';
import { Box, BoxBody, BoxHeader, BoxTitle } from 'src/components/Box';
import styled from 'styled-components';
import { BigNumber } from 'ethers';
import ImgCup from 'src/assets/img/cup.svg';
import NumberDisplay from 'src/components/Number';

interface RoundPrizeBoxProps {
  total: BigNumber;
  prizes: BigNumber[];
  ticketsSold: BigNumber;
}

const RoundPrizeBox: React.FC<RoundPrizeBoxProps> = ({ total, prizes, ticketsSold }) => {
  const jackpot = prizes ? prizes[0] : null;
  const matchFour = prizes ? prizes[1] : null;
  const matchThree = prizes ? prizes[2] : null;
  return (
    <Box>
      <BoxHeader>
        <BoxTitle>Rewards for this round</BoxTitle>
      </BoxHeader>
      <BoxBody>
        <StyledTotal>
          <img src={ImgCup} />
          <div className="content">
            <div>Current Total Rewards</div>
            <div className="prize-value">
              <NumberDisplay value={total} decimals={18} precision={0} keepZeros={true} />
              <span className="prize-unit">PeepoQuest</span>
            </div>
          </div>
        </StyledTotal>
        <StyledPrizeTable>
          <div className="row header">
            <div className="left">Reward</div>
            <div className="right">Value</div>
          </div>
          <div className="row">
            <div className="left">Jackpot</div>
            <div className="right jackpot">
              <NumberDisplay value={jackpot} decimals={18} precision={0} keepZeros={true} />
              <span className="prize-unit">PeepoQuest</span>
            </div>
          </div>
          <div className="row">
            <div className="left">Match 4</div>
            <div className="right">
              <NumberDisplay value={matchFour} decimals={18} precision={0} keepZeros={true} />
              <span className="prize-unit">iron</span>
            </div>
          </div>
          <div className="row">
            <div className="left">Match 3</div>
            <div className="right">
              <NumberDisplay value={matchThree} decimals={18} precision={0} keepZeros={true} />
              <span className="prize-unit">iron</span>
            </div>
          </div>
          <div className="row row-total">
            <div className="total-ticket-sold">
              Total:{' '}
              <NumberDisplay value={ticketsSold} decimals={0} precision={0} keepZeros={true} />{' '}
              offerings
            </div>
          </div>
        </StyledPrizeTable>
      </BoxBody>
    </Box>
  );
};

const StyledPrizeTable = styled.div`
  .row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 10px 0;
    border-bottom: solid 1px #303030;
    &:last-child {
      border-bottom: none;
    }
    .left {
      font-weight: 700;
    }
    .right {
      font-weight: 600;
      font-size: 20px;
      color: #c0794f;
      .prize-unit {
        font-weight: 500;
        font-size: 0.8rem;
        margin-left: 5px;
        color: #b8b8b8;
      }
      &.jackpot {
        color: #dab03d;
        font-size: 30px;
        background: -webkit-linear-gradient(#e7d58b, #dfb771);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 500;
        line-height: 1;
      }
    }
    &.header {
      border-bottom: none;
      padding-bottom: 0;
      font-weight: 700;
      font-size: 0.85rem;
      .left,
      .right {
        font-size: 0.85rem;
        color: #b8b8b8 !important;
      }
    }
    &.row-total {
      padding: 0;
      .total-ticket-sold {
        padding-top: 15px;
        padding-bottom: 5px;
        font-size: 1rem;
        font-weight: 700;
        text-align: center;
        margin: 0 auto;
      }
    }
  }
`;

const StyledTotal = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: solid 1px #303030;
  padding-top: 10px;
  padding-bottom: 15px;
  margin-bottom: 0;
  img {
    margin-top: 5px;
  }
  .content {
    margin-left: 15px;
    .prize-value {
      font-size: 2rem;
      line-height: 1.3;
      text-transform: uppercase;
      font-weight: 700;
      color: #2dfc8b;
    }
    .prize-unit {
      font-size: 1.5rem;
      margin-left: 5px;
      font-weight: 800;
    }
  }
`;

export default RoundPrizeBox;
