import { Theme } from "@emotion/react";

export const navbarStyle = (theme: Theme) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: `${theme.colors.primary[5]}`,
  padding: "0 10px",
  top: "0",
  zIndex: 1,
});

export const iconStyle = (theme: Theme) => ({
  cursor: "pointer",
  fontSize: "20px",
});

export const themeIconStyle = (theme: Theme) => ({});

export const logoutIconStyle = (theme: Theme) => ({
  marginLeft: "10px",

  [`@media only screen and (min-width: ${theme.breakpoints.sm})`]: {
    marginLeft: "20px",
  },
});
