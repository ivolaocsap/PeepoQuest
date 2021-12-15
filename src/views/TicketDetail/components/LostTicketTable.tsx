import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Ticket } from 'src/hooks/useMyTicketNumber';
import styled from 'styled-components';
import TicketNumber from './TicketNumber';

import { Col, Row } from 'src/components/Layout';

import { faArrowLeft, faArrowRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

type LostTicketTableProps = {
  isCloseRound: boolean;
  powerBall: number;
  winNumbers: number[];
  data: Ticket[];
  loading?: boolean;
};

const LostTicketTable: React.FC<LostTicketTableProps> = ({
  data,
  isCloseRound,
  winNumbers,
  loading,
}) => {
  const take = 24;
  const [skip, setSkip] = useState(0);
  const [isEndOfList, setIsEndOfList] = useState(false);

  useEffect(() => {
    setSkip(0);
  }, [data]);

  useEffect(() => {
    setIsEndOfList(data?.length <= skip + take ? true : false);
  }, [data, skip]);

  const filterData = useMemo(() => {
    return data?.slice(skip, skip + take);
  }, [skip, take, data]);

  const next = useCallback(() => {
    setSkip((s) => s + take);
  }, [take]);

  const previous = useCallback(() => {
    setSkip((s) => s - take);
  }, [take]);
  return (
    <StyledYourTicket>
      <StyledYourTicketTitle>Your offerings</StyledYourTicketTitle>
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FontAwesomeIcon className="loading" icon={faCircleNotch} spin size="lg" />
        </div>
      ) : (
        <div>
          {data?.length > 0 ? (
            <div className="other-ticket">
              <CustomRow>
                {filterData?.map((item, index) => (
                  <Col key={index} xl={4}>
                    <TicketNumber
                      powerBall={0}
                      winNumber={isCloseRound ? winNumbers : undefined}
                      lost={true}
                      ticket={item.numbers}
                      isSmallSize
                    />
                  </Col>
                ))}
              </CustomRow>
              <StyledFooter>
                <div className="info">
                  Showing from {skip + 1} to{' '}
                  {skip + take <= data?.length ? skip + take : data.length} of {data?.length}{' '}
                  Tickets
                </div>
                <div className="group-button">
                  {skip > 0 && (
                    <StyledButton onClick={previous}>
                      <FontAwesomeIcon icon={faArrowLeft} />
                      &nbsp;Previous
                    </StyledButton>
                  )}
                  {!isEndOfList && (
                    <StyledButton onClick={next}>
                      Next&nbsp;
                      <FontAwesomeIcon icon={faArrowRight} />
                    </StyledButton>
                  )}
                </div>
              </StyledFooter>
            </div>
          ) : (
            <div className="no-results">You have not purchased any tickets in this round</div>
          )}
        </div>
      )}
    </StyledYourTicket>
  );
};

export default LostTicketTable;

const StyledYourTicket = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  border-top: 2px dashed #4d000055;
  .other-ticket {
    margin: 0px 40px 20px 40px;
  }
  .no-results {
    text-align: center;
    padding: 10px 0 30px;
    color: ${({ theme }) => theme.color.primary.light};
  }
  .loading {
    margin-bottom: 40px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    .other-ticket {
      margin: 0px 18px 40px 18px;
    }
  }
`;

const StyledYourTicketTitle = styled.div`
  margin: 23px 0px;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`;

const CustomRow = styled(Row)`
  margin: -${(p) => p.gutter || '9px'};

  ${Col} {
    padding: ${(p) => p.gutter || '9px'};
  }
`;

const StyledFooter = styled.div`
  display: flex;
  margin-top: 30px;
  .group-button {
    margin-left: auto;
  }
  .info {
    font-size: 18px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    align-items: center;
    .group-button {
      margin-left: 0px;
      margin-top: 20px;
    }
  }
`;

export const StyledButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  color: #f69963;
  font-family: ${({ theme }) => theme.font.sans};
  padding: 0px 10px;
  :hover {
    text-decoration: underline;
  }

  & + & {
    border-left: 1px solid #ddd;
  }
`;
