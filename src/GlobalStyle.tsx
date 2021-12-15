import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: 'MedievalSharp', cursive;
  src: url('font.ttf') format('truetype');
}
* {
  font-family: 'MedievalSharp', cursive;
}

  html {
    color: #fff;
    font-size: 30px;
background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  }

  body {
    margin: 0;
    font-family: 'MedievalSharp', cursive;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 30px;
background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;
    min-height: 100vh;
  }

  h1, h2, h3, h4,h5, h6 {
    font-family: 'MedievalSharp', cursive;
    font-weight: 1000;
  }

  code, svg {
    font-family: 'Magna Veritas'
  }

  button {
    user-select: none;
    font-family:'Magna Veritas';
  }

  .btn-group {
    display: flex;
  }

  .ml-1 {
    margin-left: 5px;
  }

  .ml-2 {
    margin-left: 10px;
  }

  .ml-3 {
    margin-left: 15px;
  }

  .btn {
    font-size: 18px;
background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
    font-weight: 600;
    appearance: none;

    font-family: 'MedievalSharp', cursive;
    background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
    border-radius: 10px;

    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
    cursor: pointer;
    transition: ease-in-out 100ms;
    text-transform: uppercase;
    background-color: rgba(0, 0, 0, 0.71);
    backdrop-filter: blur(9px);
    box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
      inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

    &.btn-outline {
      background: transparent;


      &:hover {

        background-color: #6b171d;
        background-color: rgba(33, 33, 33, 0.71);
        backdrop-filter: blur(9px);
        box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1),
          inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1);

      }
    }
    &:hover {
      background-color: #6b171d;;

    }

    &.btn-success {
      background-color: #00a75b;
      border-color: #00a75b;
      &:hover {
        background-color: #137247;

      }
    }

    &.btn-icon {
      width: 38px;
      padding: 0;
      justify-content: center;
      &.btn-icon-highlight {
        background: -webkit-linear-gradient(#e7d58b, #dfb771);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        &:hover {
          background-color: ${(p) => p.theme.color.green[100]};
        }
      }
    }
    &.btn-triangle {
      background-color: #f69963;
      font-size: 0.8rem;
      text-decoration: none;
      i {
        transform: rotate(90deg);
      }
      &:hover {
        background-color: ${(p) => p.theme.color.green[100]};
      }
    }
  }

  a {
    background: -webkit-linear-gradient(#eee, #333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: none;
  }

  .text-primary {

  }

  a.link {
    color: ${({ theme }) => theme.color.grey[200]};
    &:hover {
      color: ${(p) => p.theme.color.green[100]};
    }
  }

  * {
    outline: none;
    box-sizing: border-box;
  }

  .clock {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .clock-desc {
    font-weight: 600;
    font-size: 13px;
    display: flex;
    align-items: center;
    opacity: 0.8;
    margin-left: 5px;
    display: none;
  }
  .clock-desc i {
    color: #ffa900;
    font-size: 22px;
    margin-right: 5px;
  }

  .clock-time {
    display: flex;
    align-items: center;
  }

  .clock-time-frag {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40px;
  }

  .clock-time-frag-number {
    font-size: 22px;
    font-weight: 700;
    color: #ffa900;
  }

  .clock-time-separator {
    font-weight: 700;

    opacity: 0.7;
    font-size: 20px;
    padding: 0 30px;
  }

  .clock-time-frag-desc {

    opacity: 0.7;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    .clock-time-frag {
      width: 20px;
    }
    .clock-time-frag-number {
      font-size: 30px;
background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
    }
    .clock-time-separator {
      padding: 0 15px;
      font-size: 14px;
    }
    .clock-time-frag-desc {
      font-size: 11px;
    }
  }

  .d-none {
    display: none;
  }

  .d-lg-inline {
    @media (min-width: ${(p) => p.theme.breakpoints.lg}) {
      display: inline
    }
  }

  .d-md-inline {
    @media (min-width: ${(p) => p.theme.breakpoints.md}) {
      display: inline
    }
  }
`;
