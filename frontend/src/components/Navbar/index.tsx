import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { NAVBAR_HEIGHT } from "./constants";
import { iconStyle, navbarStyle, themeIconStyle } from "./style";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import useCustomTheme from "../../hooks/useCustomTheme";

export default function Navbar() {
  const { logout } = useAuth();
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
        <FiLogOut css={iconStyle} onClick={logout} />
      </div>
    </nav>
  );
}
