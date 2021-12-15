import React from 'react';
import { LotteryInfo } from 'src/diamondhand/Lottery';
import styled from 'styled-components';
import ImgBallNormal from 'src/assets/img/ball-normal-large.svg';
import ImgBallPower from 'src/assets/img/ball-power-large.svg';

interface LastWiningNumberProps {
  lotteryInfo: LotteryInfo;
}

const LastWiningNumber: React.FC<LastWiningNumberProps> = ({ lotteryInfo }) => {
  return (
    <StyledContainer>
      <Title>Latest winning Emojis - Round {lotteryInfo?.lotteryId?.toNumber()}</Title>
      <NumbersRow>
        {(lotteryInfo?.winningNumbers || []).map((n, key) => (
          <NumberBox key={key}>{n}</NumberBox>
        ))}
      </NumbersRow>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h4`
  text-transform: uppercase;
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 20px;
    text-align: center;
  }
`;

const NumbersRow = styled.div`
  display: grid;
  grid-gap: 35px;
  grid-template-columns: repeat(5, 1fr);
  padding: 0 10px;
  margin-top: 20px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    grid-gap: 0;
    display: flex;
    justify-content: space-between;
  }
`;

const NumberBox = styled.div`
  margin-top: -5px;
  width: 88px;
  height: 88px;
  background-image: url(${ImgBallNormal});
  color: #000000;
  background-size: cover;
  background-repeat: none;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-size: 42px;
  font-weight: 700;
  &:last-child {
    background-image: url(${ImgBallPower});
  }
  @media (max-width: 768px) {
    width: 66px;
    height: 64px;
    font-size: 36px;
  }
`;

export default LastWiningNumber;
