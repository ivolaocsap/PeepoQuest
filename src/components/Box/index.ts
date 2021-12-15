import styled from 'styled-components';

export const Box = styled.div`
  background-image: linear-gradient(
    -45deg,
    ${(p) => p.theme.color.secondary},
    ${(p) => p.theme.color.primary.light}
  );
  border: solid 0px #303030;
  height: 100%;
  color: #fff;
  border-radius: 22px;
  border-radius: 22px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

export const BoxHeader = styled.div<{ bg?: string }>`
  text-transform: uppercase;
  background-color: ${(p) => p.theme.color.secondary};
  background-image: linear-gradient(
    170deg,
    ${(p) => p.theme.color.secondary},
    ${(p) => p.theme.color.primary.light}
  );
  border-bottom: solid 1px #303030;
  padding: 12px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;

  display: flex;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const BoxTitle = styled.div`
  font-family: 'MedievalSharp', cursive;
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-weight: 700;
`;

export const BoxAction = styled.div`
  margin-left: auto;
`;

export const BoxBody = styled.div`
  padding: 8px 15px;
`;
