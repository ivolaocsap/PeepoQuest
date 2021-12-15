// import original module declarations
import 'styled-components';
// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: number;
    color: {
      black: string;
      yellow: string;
      blue: Record<number, string>;
      grey: Record<number, string>;
      teal: Record<number, string>;
      green: Record<number, string>;
      primary: {
        light: string;
        main: string;
      };
      secondary: string;
      white: string;
      orange: Record<number, string>;
      red: Record<number, string>;
      danger: string;
      success: string;
      bg: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    siteWidth: number;
    spacing: Record<number, number>;
    topBarSize: number;

    font: {
      monospace: string;
      sans: string;
      heading: string;
    };
  }
}
