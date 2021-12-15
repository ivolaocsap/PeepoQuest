import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';
import { TicketItemProp } from 'src/api/models';
import Container from 'src/components/Container';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';
import useApprove, { ApprovalState } from 'src/hooks/useApprove';
import useDiamondHand from 'src/hooks/useDiamondHand';
import useTryConnect from 'src/hooks/useTryConnect';
import theme from 'src/theme';
import SelectTicketItem from './SelectTicketItem';
import TicketImg from 'src/assets/img/ticket-white.svg';
import Page from 'src/components/Page';
import { flatten } from 'src/utils/objects';
import useHandleTransactionReceipt from 'src/hooks/useHandleTransactionReceipt';
import NumberDisplay from 'src/components/Number';
import { ExternalLinks } from 'src/config';
import { useTokenBalance } from 'src/contexts/AccountBalanceProvider/AccountBalanceProvider';
import { useCurrentLotto } from 'src/contexts/CurrentLotteryProvider/CurrentLotteryProvider';
import { useHistory } from 'react-router';
import useModal from 'src/hooks/useModal';
import BuyMultiTicketModal from './BuyMultiTicketModal';
import crypto from 'crypto';
import ButtonSelectCollateral from 'src/components/ButtonSelectCollateral';
import ERC20 from 'src/diamondhand/ERC20';
import { useWeb3React } from '@web3-react/core';
import Spacer from 'src/components/Spacer';

enum ButtonStatus {
  notConnected = 1,
  insufficient = 2,
  requireApproval = 3,
  approvalPending = 4,
  paused = 15,
  ready = 20,
  notEnough = 21,
}

const EmptyTicket: TicketItemProp = {
  id: undefined,
};

const LIMIT_TICKET = 6;

const BuyTickets: React.FC = () => {
  const diamondHand = useDiamondHand();
  const config = useConfiguration();
  const { tryConnect } = useTryConnect();
  const { account } = useWeb3React();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const { info, maxValidRange, powerBallRange } = useCurrentLotto();
  const [tickets, setTickets] = useState<TicketItemProp[]>([EmptyTicket]);
  const [token, setToken] = useState<ERC20 | undefined>();
  const balance = useTokenBalance(token);
  const price = BigNumber.from('42');
  const price1 = BigNumber.from('12');

  useEffect(() => {
    if (!diamondHand || token) return;
    setToken(diamondHand.PEEPOQUEST);
  }, [diamondHand, token]);

  const buyAddress = useMemo(() => {
    if (!config) {
      return;
    }
    return config?.addresses?.Nft;
  }, [config]);

  const [approvalTokenState, approveToken] = useApprove(token, buyAddress);

  const validTickets = useMemo(() => {
    return tickets.filter((t) => t.id < 6);
  }, [tickets]);
  console.log(price);
  const totalCost = useMemo(() => {
    if (!info?.costPerTicket || !token) {
      return BigNumber.from(42);
    }
    return BigNumber.from(42)
      .mul(validTickets?.length || 0)
      .mul(BigNumber.from(1e6))
      .div(10 ** (18 - (token?.decimals || 18)))
      .div(1e6);
  }, [info?.costPerTicket, token, validTickets?.length]);

  const status = useMemo(() => {
    if (!account) {
      return ButtonStatus.notConnected;
    }

    if (approvalTokenState == ApprovalState.PENDING) {
      return ButtonStatus.approvalPending;
    }

    if (approvalTokenState !== ApprovalState.APPROVED) {
      return ButtonStatus.requireApproval;
    }

    if (balance && balance.lt(totalCost)) {
      return ButtonStatus.notEnough;
    }

    return ButtonStatus.ready;
  }, [approvalTokenState, account, totalCost, balance]);

  const buttonText = useMemo(() => {
    switch (status) {
      case ButtonStatus.notConnected:
        return 'Connect';

      case ButtonStatus.approvalPending:
        return `Approving ${token?.symbol}...`;

      case ButtonStatus.requireApproval:
        return 'Approve';

      case ButtonStatus.notEnough:
        return `Not Enough ${token?.symbol}`;

      default:
        return 'Buy Baby NFT';
    }
  }, [status, token]);

  const addNewTicket = useCallback(() => {
    setTickets((x) => {
      const newBall = { ...EmptyTicket };
      return [...x, newBall];
    });
  }, []);

  const onChangeTicket = useCallback((index: number, ticket: TicketItemProp) => {
    setTickets((state) => {
      return state.map((item, idx) => {
        if (idx !== index) {
          return item;
        }

        return {
          ...item,
          ...ticket,
        };
      });
    });
  }, []);

  const removeTicket = useCallback((id: number) => {
    setTickets((tickets) => tickets.slice(0, id).concat(tickets.slice(id + 1)));
  }, []);

  const onChangePaymentToken = useCallback(
    (token?: ERC20) => {
      if (token) {
        setToken(diamondHand?.getTokenByAddress(token?.address));
      }
    },
    [diamondHand],
  );

  const buy = useCallback(async () => {
    const validTickets = tickets.filter((t) => t.id < 6); // TODO: real check
    const numbers = flatten(validTickets.map((t) => [t.id]));

    if (!validTickets.length) {
      return;
    }

    for (let index = 0; index < numbers.length + 1; index++) {
      try {
        const tx = await handleTransactionReceipt(
          diamondHand?.NFT.mint(account, 3, BigNumber.from(3)),
          `Mint My Hero`,
        );
        if (tx && tx.response) {
          await tx.response.wait();
          tx.hideModal();
        }
      } catch {
        //
      }
    }
  }, [price1, diamondHand?.NFT, handleTransactionReceipt, tickets]);

  const onClickBuy = useCallback(async () => {
    switch (status) {
      case ButtonStatus.notConnected:
        tryConnect();
        break;
      case ButtonStatus.requireApproval:
        await approveToken();
        break;
      case ButtonStatus.notEnough:
      case ButtonStatus.approvalPending:
        break;
      case ButtonStatus.ready:
        buy();
        break;
    }
  }, [status, tryConnect, approveToken, buy]);

  return (
    <Page home>
      <Container size="homepage">
        <HeaderStyled>
          <BuyTicketHeaderStyled>
            <BuyTicketImagetyled>
              <img src={TicketImg} />
            </BuyTicketImagetyled>
            <BuyTicketLabeltyled>Buy PeepoQuest NFT</BuyTicketLabeltyled>
          </BuyTicketHeaderStyled>
          <StyledHeaderRight>
            <StyledRole>Buy up to {LIMIT_TICKET} NFT's</StyledRole>
            <Spacer />
          </StyledHeaderRight>
        </HeaderStyled>
        <StyledWrapBody>
          <StyledBody>
            <NumberTicketHeaderStyled>
              <StyledLabel>Babies:</StyledLabel>
            </NumberTicketHeaderStyled>
            <TicketContainerStyled>
              {tickets.map((ticket, index) => {
                return (
                  <SelectTicketItemContainerStyled key={index}>
                    <SelectTicketItem
                      index={index}
                      ticketItem={ticket}
                      onChange={onChangeTicket}
                      removeTicket={removeTicket}
                    ></SelectTicketItem>
                  </SelectTicketItemContainerStyled>
                );
              })}
              <AddNewTicketButtonStyled
                disabled={tickets?.length >= LIMIT_TICKET}
                onClick={addNewTicket}
              >
                <AddNewTicketButtonHeader>Add PeepoQuest</AddNewTicketButtonHeader>
                <AddNewTicketButtonPlus>+</AddNewTicketButtonPlus>
              </AddNewTicketButtonStyled>
            </TicketContainerStyled>
          </StyledBody>
          <StyledWrapPayment>
            <StyledPaymentLabel>Payment</StyledPaymentLabel>
            <StyledPaymentContent>
              <StyledPaymentHeader>
                <ButtonSelectCollateral
                  tokenAddress={token?.address}
                  onSelected={onChangePaymentToken}
                />

                <StyledBalance>
                  <span>Balance: </span>
                  <BignumberStyled>
                    <NumberDisplay
                      value={balance}
                      decimals={token?.decimals || 18}
                      precision={0}
                    />
                  </BignumberStyled>
                  <span className="unit">{token?.symbol}</span>
                </StyledBalance>
              </StyledPaymentHeader>
              <StyledPaymentBody>
                <StyledFlex>
                  <label>Price per NFT </label>
                  <BignumberStyled>
                    <NumberDisplay value={price} decimals={18} precision={0} keepZeros={true} />
                    <span> {token?.symbol}</span>
                  </BignumberStyled>
                </StyledFlex>
                <StyledFlex>
                  <label>Number of tickets</label>
                  <BignumberStyled>{validTickets?.length}</BignumberStyled>
                </StyledFlex>
                <StyledFlex className="total">
                  <label>TOTAL</label>
                  <AmountStyled>
                    <NumberDisplay
                      value={totalCost}
                      decimals={token?.decimals || 18}
                      precision={4}
                      keepZeros={false}
                    />{' '}
                    {token?.symbol}
                  </AmountStyled>
                </StyledFlex>
                <ApproveButtonStyled
                  type="button"
                  className={
                    status == ButtonStatus.notEnough
                      ? 'btn btn-success not-enough'
                      : 'btn btn-success'
                  }
                  onClick={onClickBuy}
                >
                  {buttonText}
                </ApproveButtonStyled>
                <StyledBuyiron>
                  <StyledLink target="_blank" href={ExternalLinks.buyPeepoQuest}>
                    <StyledFontAwesomeIcon icon={faShoppingCart} />
                    Buy PeepoQuest
                  </StyledLink>
                </StyledBuyiron>
              </StyledPaymentBody>
            </StyledPaymentContent>
          </StyledWrapPayment>
        </StyledWrapBody>
      </Container>
    </Page>
  );
};

const StyledPaymentContent = styled.div`
  background-color: #c6f7b2;
  border-radius: 25px;
  border: solid 0px #5a8f35;
  padding: 20px;
`;

const StyledPaymentHeader = styled.div`
  border-bottom: 1px dashed #303030;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 12px;
`;

const StyledPaymentBody = styled.div`
  padding-top: 12px;
`;

const StyledFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  label {
    color: '#6e4242';
  }
  &.total {
    label {
      font-weight: 600;
    }
  }
`;

const StyledPaymentLabel = styled.div`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
  padding: 21px 0px 15px 0;
  @media (max-width: 768px) {
    padding: 15px 0 10px 0;
  }
`;

const StyledLabel = styled.div`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
`;
const StyledRole = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
  font-size: 18px;
  font-weight: 500;
  span {
    font-size: 30px;
    background: -webkit-linear-gradient(#e7d58b, #dfb771);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background: -webkit-linear-gradient(#eee, #333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
  }
  img {
    width: 8px;
    height: 20px;
    margin-right: 8px;
  }
  .select-number {
    margin-left: auto;
  }
`;

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: dashed 2px #303030;
  padding-bottom: 13px;
  @media (max-width: 768px) {
    display: block;
    border-bottom: none;
    padding-bottom: 0px;
  }
`;
const BuyTicketHeaderStyled = styled.div`
  display: flex;
  align-items: flex-end;
  @media (max-width: 768px) {
    border-bottom: dashed 2px ${theme.color.primary.main};
    padding-bottom: 20px;
  }
`;
const NumberTicketHeaderStyled = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 21px 0px 15px 0;
  @media (max-width: 768px) {
    padding: 15px 0 10px 0;
  }
`;

const StyledBuyMultiTicket = styled.button`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: normal;
  border: 3px solid ${theme.color.primary.main};
  background-color: ${theme.color.orange[500]};
  cursor: pointer;
  margin-right: 10px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 10px;
  }
`;
const BuyTicketImagetyled = styled.div`
  height: 40px;
  img {
    height: 100%;
  }
`;

const AmountStyled = styled.span`
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-weight: 700;
  color: #2dfc8b;
`;

const TransitioningBackground = keyframes`
  0% {
    background-position: 1% 0%;
  }
  50% {
    background-position: 99% 100%;
  }
  100% {
    background-position: 1% 0%;
  }
`;

const ApproveButtonStyled = styled.button`
  font-size: 1rem;
  font-weight: 600;
  color: white;
  text-align: center;
  width: 200px;
  height: 50px;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;

  position: relative;
  overflow: hidden;

  background-image: linear-gradient(
    270deg,
    ${theme.color.secondary},
    ${theme.color.primary.light}
  );
  background-size: 400% 400%;
  animation: ${TransitioningBackground} 10s ease infinite;
  // to ease the button growth on hover
  transition: 0.6s;

  &::before {
    content: '';
    display: block;
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    width: 60px;
    height: 100%;
    top: 0;
    filter: blur(30px);
    transform: translateX(-100px) skewX(-15deg);
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    background: rgba(255, 255, 255, 0.2);
    width: 30px;
    height: 100%;
    top: 0;
    filter: blur(5px);
    transform: translateX(-100px) skewX(-15deg);
  }

  &:hover {
    background-image: linear-gradient(to left, #2d8fe5, #d155b8);
    transform: scale(1.05);
    cursor: pointer;

    &::before,
    &::after {
      transform: translateX(300px) skewX(-15deg);
      transition: 0.7s;
    }
  }
`;
const BuyTicketLabeltyled = styled.h1`
  margin: 0;
  margin-left: 12px;
  font-weight: bold;
`;
const BignumberStyled = styled.span`
  margin-left: 0;
  font-weight: 700;
`;
const TicketContainerStyled = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 768px) {
    display: block;
    margin-top: 12px;
  }
`;
const SelectTicketItemContainerStyled = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    margin-bottom: 14px;
  }
`;
const AddNewTicketButtonStyled = styled.button`
  width: 100%;
  border: dashed 3px #ed3c95;
  font-size: 5rem;
  font-weight: 400;
  cursor: pointer;
  height: 238px;
  background-color: transparent;
  position: relative;
  &:hover {
    background-color: rgba(235, 185, 209, 0.3);
  }
  :disabled {
    border: none;
    cursor: not-allowed;
  }
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;
const AddNewTicketButtonPlus = styled.div`
  font-size: 78px;
  font-weight: 700;
  color: ${theme.color.primary.light};
`;
const AddNewTicketButtonHeader = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 42px;
  line-height: 1;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  font-family: 'MedievalSharp', cursive;
  background-color: transparent;
  text-transform: uppercase;
  color: ${theme.color.primary.light};
  font-size: 18px;
  font-weight: 700;
`;
const StyledHeaderRight = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: block;
    text-align: center;
    margin-top: 12px;
  }
`;

const StyledBalance = styled.div`
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  color: ${theme.color.primary.light};
  .unit {
    font-weight: 700;
    margin-left: 5px;
  }
`;
const StyledBuyiron = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  @media (max-width: 768px) {
    a {
      margin-left: 10px;
    }
  }
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;
const StyledLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  justify-content: center;
  padding: 0px;
  margin-left: 15px;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  text-decoration: none;
  &:hover {
    color: #a3212a;
  }
`;

const StyledWrapBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 50px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column-reverse;
  }
`;

const StyledBody = styled.div`
  flex: 1;
  margin-right: 20px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-right: 0px;
  }
`;

const StyledWrapPayment = styled.div`
  align-self: flex-start;
  width: 25%;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`;
export default BuyTickets;
