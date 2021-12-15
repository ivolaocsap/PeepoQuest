import { black, blue, green, grey, red, white, orange, bg, teal,pink } from './colors';

const theme = {
  borderRadius: 12,
  color: {
    black,
    blue,
    grey,
    green,
    teal,
    yellow: '#ffe970',
    primary: {
      one: pink[100],
      light: pink[200],
      main: pink[300],
    },
    secondary: pink[100],
    white,
    orange,
    red,
    danger: red[600],
    success: green[500],
    bg,
  },
  siteWidth: 1010,
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
  topBarSize: 72,

  font: {
    monospace: `Courier, monospace`,
    sans: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    heading: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
  },
};

export default theme;

export type BreakPoints = keyof typeof theme.breakpoints;

export const AllBreakpoints = Object.keys(theme.breakpoints) as BreakPoints[];

export const mediaQueries = (key: BreakPoints) => {
  return (style: TemplateStringsArray | string) =>
    `@media screen and (min-width: ${theme.breakpoints[key]}) { ${style} }`;
};

export const triangle = (
  width: number,
  height: number,
  direction: 'up' | 'down' | 'left' | 'right',
  color = 'inherit',
) => {
  const show = {
    up: 'bottom',
    down: 'top',
    left: 'right',
    right: 'left',
  }[direction];

  return `
    border-width: ${height}px ${width}px;
    border-color: transparent;
    border-style: solid;
    border-${show}-color: ${color};
    width: 0;
    height: 0
  `;
};
