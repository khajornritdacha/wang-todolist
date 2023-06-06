import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { NAVBAR_HEIGHT } from "../components/Navbar/constants";
import { Theme } from "@emotion/react";

const pageContainerStyle = (theme: Theme) => ({
  backgroundColor: `${theme.isDark ? theme.colors.secondary[0] : theme.white}`,
  color: `${theme.isDark ? theme.white : theme.black}`,
  minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
});

export default function Layout() {
  return (
    <>
      <Navbar />
      <main css={pageContainerStyle}>
        <Outlet />
      </main>
    </>
  );
}
