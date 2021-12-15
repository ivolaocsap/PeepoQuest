import React from 'react';
import Container from 'src/components/Container';
import Page from 'src/components/Page';
import styled from 'styled-components';
import ImgBannerLottery from 'src/assets/img/banner_lottery.svg';
import IcGit from 'src/assets/img/ic-git.svg';
import IcMedium from 'src/assets/img/ic-medium.svg';
import IcTelegram from 'src/assets/img/ic-telegram.svg';
import IcTwitter from 'src/assets/img/ic-twitter.svg';
import { ExternalLinks } from 'src/config';
import CountdownLarge from 'src/components/CountdownLarge';

const CountdownLaunch: React.FC = () => {
  return (
    <Page>
      <Container size="homepage">
        <StyleTextCenter>
          <StyleImgBanner draggable="false" src={ImgBannerLottery} />
          <CountdownLarge></CountdownLarge>
        </StyleTextCenter>
        <StyleLinkContainer>
          <StyleLinkItem href={ExternalLinks.codes} target="_blank">
            <StyleLinkImg src={IcGit}></StyleLinkImg>
          </StyleLinkItem>
          <StyleLinkItem href={ExternalLinks.twitter} target="_blank">
            <StyleLinkImg src={IcTwitter}></StyleLinkImg>
          </StyleLinkItem>
          <StyleLinkItem href={ExternalLinks.telegram} target="_blank">
            <StyleLinkImg src={IcTelegram}></StyleLinkImg>
          </StyleLinkItem>
          <StyleLinkItem href={ExternalLinks.medium} target="_blank">
            <StyleLinkImg src={IcMedium}></StyleLinkImg>
          </StyleLinkItem>
        </StyleLinkContainer>
      </Container>
    </Page>
  );
};

const StyleTextCenter = styled.div`
  text-align: center;
`;
const StyleImgBanner = styled.img`
  margin-bottom: 22px;

  @media (max-width: 768px) {
    max-width: 95%;
    margin-top: 30px;
  }
`;
const StyleLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  z-index: 100;
`;
const StyleLinkItem = styled.a`
  margin-right: 18px;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
`;
const StyleLinkImg = styled.img`
  width: 26px;
  height: 26px;
`;
export default CountdownLaunch;
