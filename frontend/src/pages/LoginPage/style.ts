import { Theme } from "@emotion/react";

export const pageContainerStyle = (theme: Theme) => ({
  width: "100vw",
  display: "flex",
  flexDirection: "column" as "column",
  alignItems: "center",
  gap: "50px",
});

export const headingContainerStyle = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column" as "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: "25%",
  marginTop: "20%",

  [`@media only screen and (min-width: ${theme.breakpoints.sm})`]: {
    marginTop: "10%",
  },
});

export const formContainerStyle = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column" as "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  marginBottom: "10px",
});

export const loginBtnStyle = (theme: Theme) => ({
  width: "100px",
  border: "none",
  borderRadius: "0.5rem",
  backgroundColor: "#fbb22c",
  height: "35px",
  fontSize: "1rem",
  cursor: "pointer",
});

export const disableBtnStyle = (theme: Theme) => ({
  backgroundColor: "rgb(200, 198, 198)",
  color: "whitesmoke",
  cursor: "not-allowed",
});
