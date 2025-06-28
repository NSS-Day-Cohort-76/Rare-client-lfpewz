import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBarEditorial.css";
import Logo from "./rare.jpeg";

export const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const navbar = useRef();
  const hamburger = useRef();
  const [darkMode, setDarkMode] = useState(
    document.body.classList.contains("dark-mode")
  );

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle("active");
    navbar.current.classList.toggle("active");
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    setDarkMode(!darkMode);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a className="logo" href="/">
          <img src={Logo} alt="Rare Logo" className="logo-img" />
          <h1 className="site-title">Rare Publishing</h1>
        </a>

        <button
          className="burger"
          aria-label="menu"
          aria-expanded="false"
          onClick={showMobileNavbar}
          ref={hamburger}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {user && (
            <>
              <Link to="/allposts" className="nav-item">
                All Posts
              </Link>
              <Link to="/myposts" className="nav-item">
                My Posts
              </Link>
              <Link to="/categorymanager" className="nav-item">
                Category Manager
              </Link>
              <Link to="/tagmanager" className="nav-item">
                Tag Manager
              </Link>
            </>
          )}
          {user?.isStaff && (
            <Link to="/user-profiles" className="nav-item">
              User Profiles
            </Link>
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-buttons">
            <button className="button text" onClick={toggleDarkMode}>
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            {user?.id ? (
              <button
                className="button outline"
                onClick={() => {
                  setUser(null);
                  navigate("/");
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/register" className="button accent">
                  Register
                </Link>
                <Link to="/login" className="button outline">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
