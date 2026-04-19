import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import "../styles/navbar.css";

const navItems = [
  { label: "Home", to: "/dashboard", icon: "fa-house" },
  { label: "Post", to: "/post", icon: "fa-plus" },
  { label: "Leaderboard", to: "/leaderboard", icon: "fa-trophy" },
  { label: "Profile", to: "/profile", icon: "fa-user" }
];

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { showToast } = useToast();

  const handleLogout = () => {
    logout();
    showToast("You have been logged out");
    navigate("/");
  };

  return (
    <header className="app-navbar">
      <button
        type="button"
        className="app-brand"
        onClick={() => navigate("/dashboard")}
      >
        <i className="fa-solid fa-plate-wheat"></i>
        <span>SharePlate</span>
      </button>

      <nav className="app-nav-links" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `app-nav-link${isActive ? " app-nav-link--active" : ""}`
            }
          >
            <i className={`fa-solid ${item.icon}`}></i>
            <span>{item.label}</span>
          </NavLink>
        ))}

        <button
          type="button"
          className="app-nav-link app-nav-link--logout"
          onClick={handleLogout}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Logout</span>
        </button>
      </nav>
    </header>
  );
}
