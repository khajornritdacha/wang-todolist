import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { NAVBAR_HEIGHT } from "./constants";
import { icon, navbarStyle } from "./style";

export default function Navbar() {
  const { logout } = useAuth();
  return (
    <nav
      css={navbarStyle}
      style={{ height: NAVBAR_HEIGHT, position: "sticky" }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h1>TodoList</h1>
      </Link>
      <FiLogOut css={icon} onClick={logout} />
    </nav>
  );
}
