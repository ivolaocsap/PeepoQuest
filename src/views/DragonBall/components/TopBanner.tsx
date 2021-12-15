import React, { useMemo } from 'react';
import styled from 'styled-components';
import NextDrawCountdown from './NextDrawCountdown';
import ImgBannerLeft from 'src/assets/img/banner-left.png';
import ImgBannerRight from 'src/assets/img/banner-right.svg';
import isPast from 'date-fns/isPast';

interface TopBannerProps {
  notReady: boolean;
  lotteryId: number;
  startingTimestamp: Date;
  closingTimestamp: Date;
}

const TopBanner: React.FC<TopBannerProps> = ({
  notReady,
  lotteryId,
  startingTimestamp,
  closingTimestamp,
}) => {
  const notStarted = useMemo(() => {
    if (!startingTimestamp) {
      return false;
    }
    return !isPast(startingTimestamp);
  }, [startingTimestamp]);

  const isPastClosing = useMemo(() => {
    return isPast(closingTimestamp);
  }, [closingTimestamp]);

  return (
    <TopCountdownBanner small={notReady} className={notReady ? 'small' : ''}>
      <TopCountdownLeft className="left">
        <img src={ImgBannerLeft} />
      </TopCountdownLeft>
      <TopCountdownContent className="content">
        {notReady ? (
          <h2>💎 Next Emoji Lotto soon 💎</h2>
        ) : notStarted ? (
          <h2>Round {lotteryId?.toString()} has not yet started</h2>
        ) : (
          <>
            <h4>Next Lotto - Round {lotteryId?.toString()}</h4>
            {isPastClosing ? (
              <DrawingContainer>Awaiting for results...</DrawingContainer>
            ) : (
              <NextDrawCountdown to={closingTimestamp} />
            )}
          </>
        )}
      </TopCountdownContent>
      <TopCountdownRight className="right">
        <img src={ImgBannerRight} />
      </TopCountdownRight>
    </TopCountdownBanner>
  );
};

const TopCountdownBanner = styled.div<{ small?: boolean }>`
  position: relative;
  background-color: #a3212a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  text-transform: uppercase;
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  height: ${({ small }) => (small ? '80px' : '100px')};
  @media (max-width: 768px) {
    height: 85px;
  }
`;
const TopCountdownContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  h4 {
    margin: 0;
    font-weight: 500;
  }
  h2 {
    margin: 0;
    font-size: 22px;
  }
  @media (max-width: 768px) {
    padding-left: 40px;
    padding-right: 10px;
    text-align: center;
    h4 {
      font-size: 14px;
    }
  }
`;
const TopCountdownLeft = styled.div`
  position: absolute;
  left: 15px;
  bottom: -6px;
  img {
    width: 180px;
  }
  @media (max-width: 768px) {
    left: 5px;
    bottom: 0px;
    img {
      width: 60px;
    }
  }
`;
const TopCountdownRight = styled.div`
  position: absolute;
  right: 25px;
  @media (max-width: 768px) {
    img {
      display: none;
    }
  }
`;

const DrawingContainer = styled.h2`
  color: ${(props) => props.theme.color.green[600]} !important;
  font-weight: 700;
`;

export default TopBanner;
