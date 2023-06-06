import { Theme } from "@emotion/react";

export const theme: Theme = {
  isDark: true,
  white: "#FCFCFC",
  black: "#25262B",
  colors: {
    primary: [
      "#FFEFC2",
      "#FFE397",
      "#FFD870",
      "#FFCF4C",
      "#FFC62B",
      "#FFBC13",
      "#FAB005",
      "#ECA300",
      "#D99400",
      "#C38500",
    ],
    secondary: [
      "#3D4150",
      "#393B48",
      "#343641",
      "#30323B",
      "#2C2D35",
      "#282A30",
      "#25262B",
      "#212227",
      "#1D1E23",
      "#1A1B20",
    ],
  },
  breakpoints: {
    xs: "576px",
    sm: "768px",
    md: "1020px",
    lg: "1280px",
    xl: "1440px",
  },
};
