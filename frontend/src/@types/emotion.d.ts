import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    isDark: boolean;
    white: string;
    black: string;
    colors: {
      primary: string[];
      secondary: string[];
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}
