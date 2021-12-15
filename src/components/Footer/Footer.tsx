import React from 'react';
import styled from 'styled-components';
import Container from '../Container';

const Footer: React.FC = () => (
  <StyledFooter>
    <Container size="lg"></Container>
  </StyledFooter>
);

const StyledFooter = styled.footer`
  margin-top: 20px;
  font-size: 0.9rem;
  border-top: solid 1px #97979722;
  color: ${(props) => props.theme.color.secondary};
`;

export default Footer;
