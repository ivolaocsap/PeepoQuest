import React, { useEffect, useMemo, useState } from 'react';
import theme from 'src/theme';
import styled from 'styled-components';
import ImgCountdown from 'src/assets/img/countdown.svg';

interface RemainingTime {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const CountdownLarge: React.FC = () => {
  const launchDate = new Date(1620309600 * 1000).getTime();
  const [distance, setDistance] = useState(0);
  const remaining: RemainingTime = useMemo(() => {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }, [distance]);

  useEffect(() => {
    let mounted = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let interval: any = undefined;
    if (mounted) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        setDistance(launchDate - now);
      });
    }
    return () => {
      mounted = false;
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    distance > 0 && (
      <StyleCountdownContainer>
        <StyleStyleCountdownLabelContainer>
          <StyleCountdownIcon src={ImgCountdown} />
          <StyleCountdownLabel>Countdown to Launch</StyleCountdownLabel>
        </StyleStyleCountdownLabelContainer>
        <StyledContainer>
          <StyleTimeBlock>
            <StyledSpan>{padNumber(remaining.days)}</StyledSpan>
            <StyleLabelTime>Day{remaining.days > 1 ? 's' : ''}</StyleLabelTime>
          </StyleTimeBlock>
          <StyleTimeBlock>
            <StyledSpan>{padNumber(remaining.hours)}</StyledSpan>
            <StyleLabelTime>Hour{remaining.hours > 1 ? 's' : ''}</StyleLabelTime>
          </StyleTimeBlock>
          <StyleTimeBlock>
            <StyledSpan>{padNumber(remaining.minutes)}</StyledSpan>
            <StyleLabelTime>Minute{remaining.minutes > 1 ? 's' : ''}</StyleLabelTime>
          </StyleTimeBlock>
          <StyleTimeBlock>
            <StyledSpan>{padNumber(remaining.seconds)}</StyledSpan>
            <StyleLabelTime>Second{remaining.seconds > 1 ? 's' : ''}</StyleLabelTime>
          </StyleTimeBlock>
        </StyledContainer>
      </StyleCountdownContainer>
    )
  );
};

const padNumber = (s: number, length = 2, char = '0') => {
  const str = s.toString();
  return str.length >= length ? str : char.repeat(length - str.length) + str;
};

const StyleCountdownContainer = styled.div`
  width: max-content;
  margin: auto;
`;

const StyleStyleCountdownLabelContainer = styled.div`
  height: 42px;
  background-color: #400003;
  display: flex;
  align-items: center;
  color: ${theme.color.white};
  justify-content: center;
`;
const StyleCountdownLabel = styled.span`
  font-size: 1.125rem;
  color: ${theme.color.white};
`;
const StyleCountdownIcon = styled.img`
  margin-right: 5px;
`;

const StyledContainer = styled.div<{ fontSize?: string; fontWeight?: string }>`
  display: flex;
  align-items: center;
  font-size: ${({ fontSize }) => fontSize || `28px`};
  font-weight: ${({ fontWeight }) => fontWeight || 700};
`;

const StyledSpan = styled.div`
  font-size: 4.75rem;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 2.3rem;
  }
`;

const StyleTimeBlock = styled.div`
  width: 227px;
  height: 220px;
  margin-right: 46px;
  padding: 26px 54px 38px 55px;
  border: solid 0px #400003;
  border-top: none;
  background-color: #e7faff;
  text-align: center;
  &:last-child {
    margin-right: 0;
  }
  @media (max-width: 768px) {
    height: 80px;
    width: 80px;
    padding: 0;
    margin-right: 16px;
    line-height: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
`;

const StyleLabelTime = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export default CountdownLarge;
