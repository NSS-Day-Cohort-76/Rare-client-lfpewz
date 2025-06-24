import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import Logo from "./rare.jpeg";

export const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const navbar = useRef();
  const hamburger = useRef();
  const [darkMode, setDarkMode] = useState(
    document.body.classList.contains("dark-mode")
  );

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle("is-active");
    navbar.current.classList.toggle("is-active");
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    setDarkMode(!darkMode);
  };

  return (
    <nav
      className="navbar is-success mb-3"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={Logo} height="3rem" alt="Rare Logo" />
          <h1 className="title is-4 ml-2">Rare Publishing</h1>
        </a>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          onClick={showMobileNavbar}
          ref={hamburger}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {user && (
            <>
              <Link to="/allposts" className="navbar-item">
                All Posts
              </Link>
              <Link to="/" className="navbar-item">
                My Posts
              </Link>
              <Link to="/categorymanager" className="navbar-item">
                Category Manager
              </Link>
              <Link to="/tagmanager" className="navbar-item">
                Tag Manager
              </Link>
              <Link to="/" className="navbar-item">
                User Manager
              </Link>
            </>
          )}
          {user?.isStaff && (
            <Link to="/user-profiles" className="navbar-item">
              User Profiles
            </Link>
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons are-small">
              <button
                className={`button ${
                  darkMode ? "is-light has-text-dark" : "is-dark has-text-light"
                }`}
                onClick={toggleDarkMode}
              >
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>

              {user ? (
                <button
                  className="button is-outlined"
                  onClick={() => {
                    setUser("");
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/register" className="button is-link">
                    Register
                  </Link>
                  <Link to="/login" className="button is-outlined">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

