import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Box, BoxBody, BoxHeader, BoxTitle } from 'src/components/Box';
import Container from 'src/components/Container';
import Page from 'src/components/Page';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';
import useDiamondHand from 'src/hooks/useDiamondHand';
import { useCurrentLotto } from 'src/contexts/CurrentLotteryProvider/CurrentLotteryProvider';
import useHandleTransactionReceipt from 'src/hooks/useHandleTransactionReceipt';
import Input from 'src/components/Input';
import NumberDisplay from 'src/components/Number';
import { ConfigurationInfo } from 'src/diamondhand/types';
import { BigNumber } from 'ethers';
import Spacer from 'src/components/Spacer';
import { formatSecs } from 'src/utils/formatTime';

interface ContractLink {
  name: string;
  address: string;
}

const Monitor: React.FC = () => {
  const dh = useDiamondHand();
  const [contracts, setContracts] = useState<ContractLink[]>([]);
  const config = useConfiguration();
  const { info, prizes: currentPrizes } = useCurrentLotto();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const [startDate, setStartDate] = useState<number>(Math.floor(Date.now() / 1000));
  const [endDate, setEndDate] = useState<number>(0);
  const [roundDraw, setRoundDraw] = useState<number>(0);
  const [data, setData] = useState<ConfigurationInfo>({} as ConfigurationInfo);
  const { deployments } = config;

  const total = useMemo(() => {
    if (!currentPrizes || currentPrizes.length == 0) return BigNumber.from(0);
    let total = currentPrizes[0];
    total = total.add(currentPrizes[1]);
    total = total.add(currentPrizes[2]);
    return total;
  }, [currentPrizes]);

  useEffect(() => {
    if (!deployments || !dh) {
      return;
    }
    dh?.getInfo().then((res) => {
      setData(res);
    });
    const _contracts: ContractLink[] = [];
    for (const [name, deployment] of Object.entries(deployments)) {
      _contracts.push({
        name,
        address: deployment.address,
      });
    }
    setContracts(_contracts);
  }, [deployments, dh]);

  const manualStart = async () => {
    try {
      const tx = await handleTransactionReceipt(
        dh.LOTTERY?.manualStartLotto(startDate, endDate),
        `Manual start lottery`,
      );
      if (tx && tx.response) {
        await tx.response.wait();
        tx.hideModal();
      }
    } catch {
      //
    }
  };

  const drawWinningNumbers = async () => {
    try {
      const tx = await handleTransactionReceipt(
        dh.LOTTERY?.drawWinningNumbers(roundDraw),
        `Draw winning lottery`,
      );
      if (tx && tx.response) {
        await tx.response.wait().then((val) => console.log(val));
        tx.hideModal();
      }
    } catch {
      //
    }
  };

  const burnPoolRatio = useMemo(() => {
    if (!data?.burnironRatio || !data?.reservePoolRatio) {
      return;
    }
    const total = data?.burnironRatio.add(data?.reservePoolRatio);
    return data?.burnironRatio.mul(1e6).div(total);
  }, [data]);

  const reservePoolRatio = useMemo(() => {
    if (!data?.burnironRatio || !data?.reservePoolRatio) {
      return;
    }
    const total = data?.burnironRatio.add(data?.reservePoolRatio);
    return data?.reservePoolRatio.mul(1e6).div(total);
  }, [data]);

  return (
    <Page>
      <Container size="lg">
        <StyledDoubleCol>
          <StyledCol>
            <Box>
              <BoxHeader>
                <BoxTitle>Information</BoxTitle>
              </BoxHeader>
              <BoxBody>
                <div className="item">
                  <div className="title">Current round:</div>
                  <div className="value"> Round {info?.lotteryId}</div>
                </div>
                <div className="item">
                  <div className="title">Cost per ticket:</div>
                  <div className="value">
                    <NumberDisplay
                      value={data?.costPerTicket}
                      decimals={18}
                      precision={0}
                      keepZeros={true}
                    />{' '}
                    iron
                  </div>
                </div>
                <div>
                  <div className="title">Prize distribution:</div>
                  <div className="value">
                    <ul>
                      <li>Jackpot: {data?.jackPotDistribution}% </li>
                      <li>Match 4: {data?.matchFourDistribution}% </li>
                      <li>Match 3: {data?.matchThreeDistribution}% </li>
                    </ul>
                  </div>
                </div>
                <div className="item">
                  <div className="title">Prize pool:</div>
                  <div className="value">
                    <NumberDisplay value={total} decimals={18} precision={0} keepZeros={true} />{' '}
                    iron
                  </div>
                </div>
                <hr />
                <div className="item">
                  <div className="title">Prize reserve pool:</div>
                  <div className="value">
                    <NumberDisplay
                      value={data?.revervePoolBalance}
                      decimals={18}
                      precision={2}
                      keepZeros={true}
                    />{' '}
                    iron
                  </div>
                </div>
                <div className="item">
                  <div className="title">Random Generator Link balance:</div>
                  <div className="value">
                    <NumberDisplay
                      value={data?.randomNumberGeneratorBalance}
                      decimals={18}
                      precision={8}
                    />{' '}
                    LINK
                  </div>
                </div>
                <hr />
                <div className="item">
                  <div className="title">Tax rate:</div>
                  <div className="value">{data?.taxRate}%</div>
                </div>
                <div className="item">
                  <div className="title">Reserve pool rate:</div>
                  <div className="value">
                    <NumberDisplay
                      value={reservePoolRatio}
                      decimals={6}
                      percentage={true}
                      precision={2}
                    />
                    %
                  </div>
                </div>
                <div className="item">
                  <div className="title">Burn iron pool rate:</div>
                  <div className="value">
                    <NumberDisplay
                      value={burnPoolRatio}
                      decimals={6}
                      percentage={true}
                      precision={2}
                    />
                    %
                  </div>
                </div>
                <hr />
                <div className="item">
                  <div className="title">Powerball range:</div>
                  <div className="value">{data?.powerBallRange}</div>
                </div>
                <div className="item">
                  <div className="title">Max valid range:</div>
                  <div className="value">{data?.maxValidRange}</div>
                </div>
              </BoxBody>
            </Box>
          </StyledCol>

          <StyledCol>
            <Box>
              <BoxHeader>
                <BoxTitle>Contracts</BoxTitle>
              </BoxHeader>
              <BoxBody>
                {(contracts || []).map((c) => (
                  <BoxListItem key={c.name}>
                    <BoxListItemLink
                      target="_blank"
                      href={`${config.etherscanUrl}/address/${c.address}`}
                    >
                      {c.name}
                    </BoxListItemLink>
                  </BoxListItem>
                ))}
              </BoxBody>
            </Box>
          </StyledCol>
          <StyledCol>
            <Box>
              <BoxHeader>
                <BoxTitle>Start New Lottery</BoxTitle>
              </BoxHeader>
              <BoxBody>
                <Spacer />
                <StyledSelectDateWrapper>
                  <div className="date">
                    <Input
                      onChange={setStartDate}
                      value={startDate}
                      placeholder="Enter start date"
                    />
                    <div className="helper">
                      Start date:{' '}
                      {startDate ? formatSecs(startDate, 'EEEE - dd/MM/yyyy - HH:mm:ss') : '--'}
                    </div>
                  </div>
                  <div className="date">
                    <Input onChange={setEndDate} value={endDate} placeholder="Enter end date" />
                    <div className="helper">
                      End date:{' '}
                      {endDate ? formatSecs(endDate, 'EEEE - dd/MM/yyyy - HH:mm:ss') : '--'}
                    </div>
                  </div>
                </StyledSelectDateWrapper>
                <StyledButtons>
                  <StyledButton className="btn" onClick={manualStart}>
                    Manual Start
                  </StyledButton>
                </StyledButtons>
              </BoxBody>
            </Box>
          </StyledCol>
          <StyledCol>
            <Box>
              <BoxHeader>
                <BoxTitle>Draw lottery</BoxTitle>
              </BoxHeader>
              <BoxBody>
                <StyledInputs>
                  <Input
                    onChange={(val) => setRoundDraw(val)}
                    value={roundDraw}
                    placeholder="Enter round number"
                  />
                </StyledInputs>
                <StyledButtons>
                  <StyledButton className="btn" onClick={drawWinningNumbers}>
                    Draw Winning Numbers
                  </StyledButton>
                </StyledButtons>
              </BoxBody>
            </Box>
          </StyledCol>
        </StyledDoubleCol>
      </Container>
    </Page>
  );
};

const StyledDoubleCol = styled.div`
  margin-top: 40px;
  display: grid;
  grid-gap: 20px;
  justify-items: center;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 768px) {
    display: block;
    margin-top: 12px;
  }
  hr {
    border: 0;
    border-top: dashed 1px #a2a2a2;
    background-color: transparent;
    margin: 15px 0;
  }
`;

const StyledCol = styled.div`
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-weight: 400;
  color: #e2e2e2;
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
  .item {
    display: flex;
  }
  .title {
    margin-right: 10px;
    font-weight: bold;
  }
  .value {
    ul {
      margin: 0;
    }
  }
`;

export const BoxList = styled.ul`
  list-style: cirle;
  padding-left: 18px;
  margin: 0;
`;
export const BoxListItem = styled.li`
  margin-bottom: 5px;
`;
export const BoxListItemLink = styled.a`
  cursor: pointer;
  border: none;
  padding-left: 0px;
  text-decoration: none;
  color: #e2e2e2;
  &:hover {
    text-decoration: underline;
  }
`;

export const BoxItem = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const StyledButtons = styled.div`
  align-items: center;
  padding: 0 15px 10px;
`;

const StyledInputs = styled.div`
  align-items: center;
  padding: 0 15px 10px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 20px 20px !important;
  margin-top: 15px;
`;

const StyledSelectDateWrapper = styled.div`
  padding: 0 15px 10px;
  .date {
    &:first-child {
      margin-bottom: 20px;
    }
    flex: 1;
    .helper {
      font-size: 13px;
      padding-left: 15px;
      padding-top: 3px;
    }
  }
`;

export default Monitor;
