import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { NAVBAR_HEIGHT } from "./constants";
import {
  iconStyle,
  navbarStyle,
  themeIconStyle,
  logoutIconStyle,
} from "./style";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import useCustomTheme from "../../hooks/useCustomTheme";

export default function Navbar() {
  const { logout, isLoggedIn } = useAuth();
  const { theme, toggleTheme } = useCustomTheme();

  return (
    <nav
      css={navbarStyle}
      style={{ height: NAVBAR_HEIGHT, position: "sticky" }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h1>TodoList</h1>
      </Link>
      <div>
        {theme.isDark ? (
          <BsSunFill css={[iconStyle, themeIconStyle]} onClick={toggleTheme} />
        ) : (
          <BsMoonFill css={[iconStyle, themeIconStyle]} onClick={toggleTheme} />
        )}
        {isLoggedIn && (
          <FiLogOut css={[iconStyle, logoutIconStyle]} onClick={logout} />
        )}
      </div>
    </nav>
  );
}
