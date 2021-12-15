import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BigNumber } from '@ethersproject/bignumber';
import NumberDisplay from 'src/components/Number';

interface MyTicketProps {
  tickets: BigNumber[];
}

const MyTickets: React.FC<MyTicketProps> = ({ tickets }) => {
  const [myTickets, setMyTickets] = useState<BigNumber[]>([]);

  useEffect(() => {
    setMyTickets(tickets);
  }, [tickets]);

  return (
    <ContainerItem>
      <NormalBallStyted>
        {myTickets?.map((ticket: BigNumber, index: number) => {
          return (
            <ButtonStyled key={index}>
              <NumberDisplay value={ticket} decimals={0} precision={6} />
              {/* {ticket?.numbers?.map((number: BigNumber, index: number) => {
                return (
                  <div>
                    dfdf
                    <NumberDisplay value={number} decimals={18} precision={6} />
                  </div>
                );
              })} */}
            </ButtonStyled>
          );
        })}
      </NormalBallStyted>
    </ContainerItem>
  );
};
const ContainerItem = styled.div`
  padding: 5px;
  border: 1px solid gray;
  margin-bottom: 10px;
`;
const NormalBallStyted = styled.div``;

const PowerBallStyted = styled.div``;

const ButtonStyled = styled.div`
  width: 36px;
  height: 30px;
  text-align: center;
  display: inline-block;
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  font-size: 12px;
  &.active {
    background-color: #c1c1c1;
  }
`;
export default MyTickets;
