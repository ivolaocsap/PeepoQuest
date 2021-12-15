import styled from 'styled-components';
import bgLottery from './assets/img/bg.png';
import Spacer from './components/Spacer';

const MainWrapper: React.FC = ({ children }) => {
  return (
    <StyledMainContent>
      <StyledMain>{children}</StyledMain>
      <Spacer size="lg" />
    </StyledMainContent>
  );
};

const StyledMainContent = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: 0;
  }

  &::before {
    background-image: url(${bgLottery});
    background-repeat: no-repeat;
    background-position: bottom center;
    background-size: cover;
    content: '';
    height: 100vh;
    width: 100%;
    left: 0;
    position: fixed;
    top: 0;
    will-change: transform;
    z-index: -1;
  }
`;

const StyledMain = styled.div`
  flex: 1;
`;

export default MainWrapper;
