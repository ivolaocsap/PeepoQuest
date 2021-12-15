import React from 'react';
import styled from 'styled-components';
import { BigNumber } from 'ethers';
import Imgiron from 'src/assets/img/iron.png';
import NumberDisplay from 'src/components/Number';

interface LastRoundPrizeBoxProps {
  total: BigNumber;
  jackpot: BigNumber;
  matchFour: BigNumber;
  matchThree: BigNumber;
  winners: BigNumber[];
}

const LastRoundPrizeBox: React.FC<LastRoundPrizeBoxProps> = ({
  total,
  jackpot,
  matchFour,
  matchThree,
  winners,
}) => {
  return (
    <StyledWrapper>
      <StyledTotal>
        <div className="content">
          <div className="wrap-prize-title">
            <img src={Imgiron} />
            <div className="prize-title">Total Rewards:</div>
          </div>
          <div className="prize-value">
            <NumberDisplay value={total} decimals={18} precision={0} keepZeros={true} />
            <span className="prize-unit">PeepoQuest</span>
          </div>
        </div>
      </StyledTotal>
      <StyledTable>
        <thead>
          <tr>
            <th className="heading">Reward</th>
            <th className="heading">Reward Size</th>
            <th className="heading">Winners</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="column">Jackpot</td>
            <td className="column">
              <NumberDisplay value={jackpot} decimals={18} precision={0} keepZeros={true} />
              <span className="unit">PeepoQuest</span>
            </td>
            <td className="column">{winners?.[0].toNumber()}</td>
          </tr>
          <tr>
            <td className="column">Match 4</td>
            <td className="column">
              <NumberDisplay value={matchFour} decimals={18} precision={0} keepZeros={true} />
              <span className="unit">PeepoQuest</span>
            </td>
            <td className="column">{winners?.[1].toNumber()}</td>
          </tr>
          <tr>
            <td className="column">Match 3</td>
            <td className="column">
              <NumberDisplay value={matchThree} decimals={18} precision={0} keepZeros={true} />
              <span className="unit">PeepoQuest</span>
            </td>
            <td className="column">{winners?.[2].toNumber()}</td>
          </tr>
        </tbody>
      </StyledTable>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  border-right: dashed 1px #303030;
  padding-right: 18px;
  padding-left: 10px;
  padding-bottom: 12px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledTotal = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 15px;
  margin-bottom: 0;
  .content {
    display: flex;
    margin-left: 15px;
    .wrap-prize-title {
      display: flex;
      align-items: center;
      img {
        width: 40px;
      }
    }
    .prize-title {
      font-size: 20px;
      font-weight: bold;
      margin-left: 10px;
    }
    .prize-value {
      margin-left: 8px;
      font-size: 34px;
      line-height: 1.2;
      text-transform: uppercase;
      font-weight: 700;
      color: #ff8a3a;
    }
    .prize-unit {
      font-size: 1.5rem;
      margin-left: 5px;
      font-weight: 800;
    }
    @media (max-width: 768px) {
      display: block;
      .wrap-prize-title {
      }
    }
  }
`;

const StyledTable = styled.table`
  border: 1px solid #303030;
  margin-top: 20px;
  border-collapse: collapse;
  .heading {
    background-color: ${(p) => p.theme.color.teal[200]};
    color: ${(p) => p.theme.color.primary.main};
    font-weight: 400;
    font-size: 14px;
    padding: 5px 20px;
  }
  .column {
    padding: 10px 20px;
    font-weight: bold;
    .unit {
      margin-left: 5px;
      font-weight: 500;
    }
  }
  @media (max-width: 768px) {
    margin-top: 0px;
  }
`;

export default LastRoundPrizeBox;
