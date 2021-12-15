import React from 'react';
import styled from 'styled-components';
import { ExternalLinks } from '../../../config';

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink target="_blank" href={ExternalLinks.codes}>
        Github
      </StyledLink>
      <StyledLink target="_blank" href={ExternalLinks.twitter}>
        Twitter
      </StyledLink>
      <StyledLink target="_blank" href={ExternalLinks.telegram}>
        Telegram
      </StyledLink>
      <StyledLink target="_blank" href={ExternalLinks.discord}>
        Discord
      </StyledLink>
      <StyledLink target="_blank" href={ExternalLinks.medium}>
        Medium
      </StyledLink>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.primary.light};
  padding-left: ${(props) => props.theme.spacing[4]}px;
  padding-right: ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.primary.main};
  }
`;

export default Nav;
