import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import bgDisclaimer from '../../assets/img/disclaimer-bg.svg';
import iconWitch from '../../assets/img/icon-witch.svg';
import { useAcceptTerms, useIsAcceptedTerms } from '../../state/application/hooks';

const Disclaimer: React.FC = () => {
  const { siteWidth } = useContext(ThemeContext);
  const isAcceptedTerms = useIsAcceptedTerms();
  const acceptTerms = useAcceptTerms();

  return (
    <>
      {!isAcceptedTerms && (
        <StyledDisclaimer>
          <img className="witch" src={iconWitch} />
          <DisclaimerContainer width={siteWidth}>
            <DisclaimerText>
              This software is an alpha release and pending for audit. You can lose all of your
              funds due to hacks, vulnerabilities, and economic attacks. Never use funds within
              the iron finance products that you cannot afford to lose. You won’t be compensated
              for any losses. All interactions with the associated smart contracts on Binance
              Smart Chain and software on dragonball.iron.finance are at your own risk.
            </DisclaimerText>
            <DisclaimerButton className="btn" onClick={acceptTerms}>
              Accept
            </DisclaimerButton>
          </DisclaimerContainer>
        </StyledDisclaimer>
      )}
    </>
  );
};

const StyledDisclaimer = styled.div`
  background-color: #ffbbe2;
  background-image: url(${bgDisclaimer});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom right;
  padding: 10px 20px 0;
  font-size: 0.9rem;
  display: flex;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 100;
  .witch {
    align-self: flex-end;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    left: 0px;
  }
`;

const DisclaimerContainer = styled.div<{ width: number }>`
  display: flex;
  padding: 0;
  margin-left: 20px;
  align-items: center;
  flex: 1;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 10px;
  }
`;
const DisclaimerText = styled.div`
  padding-right: 20px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-right: 0;
    margin-bottom: 20px;
  }
`;
const DisclaimerButton = styled.button`
  margin-left: auto;
  border: 0;
  cursor: pointer;
  outline: none;
  border: solid 0px ${({ theme }) => theme.color.primary.main};
  background-color: #f69963;
  font-size: 0.8rem;
  height: 36px;
  &:hover {
    background-color: ${({ theme }) => theme.color.green[100]};
  }
`;

export default Disclaimer;
