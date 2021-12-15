import intervalToDuration from 'date-fns/intervalToDuration';
import React, { useCallback, useEffect, useState } from 'react';
import useInterval from 'src/hooks/useInterval';
import styled from 'styled-components';

export type NextDrawCountdownProps = {
  to: Date;
};

const NextDrawCountdown: React.FC<NextDrawCountdownProps> = ({ to }) => {
  const [value, setValue] = useState({ h: '--', m: '--', s: '--' });
  const update = useCallback(() => {
    const now = new Date();

    if (to < now) {
      setValue({
        h: '00',
        m: '00',
        s: '00',
      });
      return;
    }

    if (to) {
      const duration = intervalToDuration({
        start: now,
        end: to,
      });

      setValue({
        h: padNumber((duration?.days || 0) * 24 + duration.hours),
        m: padNumber(duration.minutes),
        s: padNumber(duration.seconds),
      });
    }
  }, [to]);
  useEffect(() => update(), [update]);
  useInterval(update, 1000);

  return (
    <StyledContainer fontSize="32px" fontWeight="bold">
      <StyledSpan>{value.h}</StyledSpan>
      <StyleSeparator>:</StyleSeparator>
      <StyledSpan>{value.m}</StyledSpan>
      <StyleSeparator>:</StyleSeparator>
      <StyledSpan>{value.s}</StyledSpan>
    </StyledContainer>
  );
};

const padNumber = (s: number, length = 2, char = '0') => {
  const str = s.toString();
  return str.length >= length ? str : char.repeat(length - str.length) + str;
};

const StyledContainer = styled.div<{ fontSize?: string; fontWeight?: string }>`
  display: flex;
  align-items: center;
  font-size: ${({ fontSize }) => fontSize || `28px`};
  font-weight: ${({ fontWeight }) => fontWeight || 700};
  font-family: ${(props) => props.theme.font.heading} !important;
  @media (max-width: 768px) {
   font-size: 21px;
  }
`;

const StyledSpan = styled.span`
  margin: 0 2px;
  min-width: 50px;
  text-align: center;
  &.extra {
    width: auto;
    margin-right: 10px;
  }
`;

const StyleSeparator = styled.span`
  margin-bottom: 5px;
  min-width: 28px;
  text-align: center;
`;

export default NextDrawCountdown;
