import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, BoxHeader } from 'src/components/Box';
import Container from 'src/components/Container';
import Page from 'src/components/Page';
import styled from 'styled-components';
import imageTicket from '../../assets/img/ticket-white.svg';
import imageWin from '../../assets/img/image-win.webp';
import imageClock from '../../assets/img/img-clock.png';
import ImgBallNormal from 'src/assets/img/ball-normal-large.svg';
import ImgBallPower from 'src/assets/img/ball-power-large.svg';
import bgRound from '../../assets/img/bg_confirm.png';
import NumberDisplay from 'src/components/Number';
import NextDrawCountdown from '../DragonBall/components/NextDrawCountdown';
import useDiamondHand from 'src/hooks/useDiamondHand';
import TicketClaim from './components/TicketClaim';
import useRoundInfo from './hooks/useRoundInfo';
import { useHistory } from 'react-router-dom';
import useQuery from 'src/hooks/useQuery';
import { BigNumber } from 'ethers';

enum Status {
  NotStarted,
  Open,
  Closed,
  Completed,
}

const TicketDetail: React.FC = () => {
  const dh = useDiamondHand();
  const history = useHistory();
  const query = useQuery();
  const [currentRound, setCurentRound] = useState<number | undefined>(undefined);
  const [roundId, setRoundId] = useState<number | undefined>(undefined);
  const [currentPrize, setCurrentPrize] = useState<BigNumber[]>([]);
  const lotteryInfo = useRoundInfo(roundId);

  useEffect(() => {
    const lotteryId = query?.get('lotteryId');
    setRoundId(parseInt(lotteryId) || 0);
  }, [query]);

  useEffect(() => {
    if (!dh) return;
    dh?.LOTTERY?.getCurrentLotto().then((data) => {
      setCurentRound(data.lotteryID.toNumber());
    });
    dh?.LOTTERY?.getCurrentPrizes().then((prizes) => {
      setCurrentPrize(prizes);
    });
  }, [dh, history, roundId]);

  const closing = useMemo(() => {
    if (!lotteryInfo) {
      return;
    }
    return lotteryInfo.closingTimestamp.toNumber() * 1000;
  }, [lotteryInfo]);

  const isPastClosing = useMemo(() => {
    const now = Date.now();
    if (closing) {
      return now - closing > 0;
    }
  }, [closing]);

  const tickets = useMemo(() => {
    const temp: number[] = [];
    if (!currentRound) {
      return temp;
    }
    for (let i = 1; i <= currentRound; i++) {
      temp.push(i);
    }
    return temp;
  }, [currentRound]);

  const isClose = useMemo(() => {
    if (!lotteryInfo) {
      return false;
    }
    return lotteryInfo.lotteryStatus === Status.Completed;
  }, [lotteryInfo]);

  const onSelect = useCallback(
    (event) => {
      history.push(`?lotteryId=${event.target.value}`);
    },
    [history],
  );

  return (
    <Page>
      <Container size="lg">
        <StyledHeader>
          <img src={imageTicket} />
          RESULTS
          <StyledSelect value={roundId} onChange={onSelect}>
            {tickets.map((item, index) => (
              <option key={index} value={item}>
                Round {item}
              </option>
            ))}
          </StyledSelect>
        </StyledHeader>
        <StyledContent>
          <Box>
            <BoxHeader>
              <BoxTitle>Round {roundId}</BoxTitle>
              <StyledNumberTicket>
                Total of&nbsp;
                <NumberDisplay
                  value={lotteryInfo?.numberOfTickets}
                  decimals={0}
                  precision={0}
                  keepZeros={true}
                />
                &nbsp;Tickets
              </StyledNumberTicket>
            </BoxHeader>
            <BoxBody>
              <StyledBoxContent>
                <StyledRound>
                  <img src={isClose ? imageWin : imageClock} />
                  {isClose ? 'Winning Emojis' : 'Winning Emojis will be drawn in'}
                </StyledRound>
                {isClose ? (
                  <StyledWinNumber>
                    {lotteryInfo?.winningNumbers?.map((item, index) => (
                      <StyledWinNumberItem key={index}>{item || 0}</StyledWinNumberItem>
                    ))}
                  </StyledWinNumber>
                ) : (
                  <StyledCountdown>
                    {isPastClosing ? (
                      <div>Awaiting for results...</div>
                    ) : (
                      <NextDrawCountdown to={closing ? new Date(closing) : undefined} />
                    )}
                  </StyledCountdown>
                )}
                <StyledTable compact={!isClose}>
                  <thead>
                    <tr>
                      <th>Reward</th>
                      <th>Reward Size</th>
                      {isClose && <th>Winners</th>}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>JackPot</td>
                      <td>
                        <NumberDisplay
                          value={
                            roundId === currentRound && !isClose
                              ? currentPrize[0]
                              : lotteryInfo?.prizes[0]
                          }
                          decimals={18}
                          precision={0}
                          keepZeros={true}
                        />
                        <span>&nbsp;PeepoQuest</span>
                      </td>
                      {isClose && <td>{lotteryInfo?.winners[0]?.toString() ?? 0}</td>}
                    </tr>
                    <tr>
                      <td>Match 4</td>
                      <td>
                        <NumberDisplay
                          value={
                            roundId === currentRound && !isClose
                              ? currentPrize[1]
                              : lotteryInfo?.prizes[1]
                          }
                          decimals={18}
                          precision={0}
                          keepZeros={true}
                        />
                        <span>&nbsp;PeepoQuest</span>
                      </td>
                      {isClose && <td>{lotteryInfo?.winners[1]?.toString() ?? 0}</td>}
                    </tr>
                    <tr>
                      <td>Match 3</td>
                      <td>
                        <NumberDisplay
                          value={
                            roundId === currentRound && !isClose
                              ? currentPrize[2]
                              : lotteryInfo?.prizes[2]
                          }
                          decimals={18}
                          precision={0}
                          keepZeros={true}
                        />
                        <span>&nbsp;PeepoQuest</span>
                      </td>
                      {isClose && <td>{lotteryInfo?.winners[2]?.toString() ?? 0}</td>}
                    </tr>
                  </tbody>
                </StyledTable>
                {lotteryInfo && <TicketClaim roundId={roundId} isCloseRound={isClose} />}
              </StyledBoxContent>
            </BoxBody>
          </Box>
        </StyledContent>
      </Container>
    </Page>
  );
};

export default TicketDetail;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 32px;
  font-weight: 600;
  font-family: ${({ theme }) => theme.font.heading};
  border-bottom: 2px dashed #303030;
  padding: 20px 0px 16px 0px;
  img {
    width: 38px;
    margin-right: 12px;
  }
`;

const StyledSelect = styled.select`
  margin-left: auto;
  padding: 5px 6px;
  border: solid 0px #12161e;
  background-color: #12161e;
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-weight: 600;
`;

const StyledContent = styled.div`
  margin: 27px 60px 0px 60px;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 27px 0px 0px 0px;
  }
`;

const BoxTitle = styled.div`
  font-family: ${({ theme }) => theme.font.heading};
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
`;

const StyledNumberTicket = styled.div`
  margin-left: auto;
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-weight: 600;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0px;
  }
`;

const BoxBody = styled.div``;

const StyledBoxContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 27px;
`;

const StyledRound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  text-align: center;
  background-image: url(${bgRound});
  background-repeat: no-repeat;
  background-size: contain;
  img {
    height: 120px;
    margin-bottom: 18px;
  }
`;

const StyledCountdown = styled.div`
  font-size: 28px;
  font-weight: normal;
  color: #f69963;
  margin-top: 20px;
  font-family: ${({ theme }) => theme.font.heading};
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 20px;
  }
`;

const StyledWinNumber = styled.div`
  padding: 20px 58px;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 20px 18px;
  }
`;

const StyledWinNumberItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 86px;
  height: 86px;
  font-size: 48px;
  font-weight: bold;
  background-image: url(${ImgBallNormal});
  color: #000000;
  background-size: cover;
  background-repeat: none;
  margin: 0px 40px;
  &:last-child {
    background-image: url(${ImgBallPower});
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 50px;
    height: 50px;
    font-size: 30px;
    background: -webkit-linear-gradient(#e7d58b, #dfb771);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background: -webkit-linear-gradient(#eee, #333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0px 10px;
  }
`;

const StyledTable = styled.table<{ compact?: boolean }>`
  width: ${({ compact }) => (compact ? '80%' : '100%')};
  padding: 24px 58px;
  border-spacing: 0px;
  border: none;
  thead {
    th {
      width: 33%;
      padding: 6px 0px 0px 20px;
      background-color: #303030;
      font-size: 30px;
      background: -webkit-linear-gradient(#e7d58b, #dfb771);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background: -webkit-linear-gradient(#eee, #333);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 500;
      color: #c3c4c5;
      :last-child {
        width: 10%;
      }
    }
  }
  tbody {
    td {
      padding: 8px 0px 0px 20px;
      font-size: 30px;
      background: -webkit-linear-gradient(#e7d58b, #dfb771);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background: -webkit-linear-gradient(#eee, #333);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 600;
      span {
        font-weight: normal;
      }
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 24px 18px;
  }
`;
