import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import Logo from "./rare.jpeg"

export const NavBar = ({ user, setUser }) => {
  console.log(" Logged in User", user)
  const navigate = useNavigate()
  const navbar = useRef()
  const hamburger = useRef()

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle('is-active')
    navbar.current.classList.toggle('is-active')
  }



  return (
    <nav className="navbar is-success mb-3" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={Logo} height="3rem" alt="Rare Logo" /> <h1 className="title is-4">Rare Publishing</h1>
        </a>

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
<<<<<<< HEAD
          {user && <Link to="/allposts" className="navbar-item">All Posts</Link>}
          {user && <Link to="/" className="navbar-item">My Posts</Link>}
          {user && <Link to="/categorymanager" className="navbar-item">Category Manager</Link>}
          {user && <Link to="/tagmanager" className="navbar-item">Tag Manager</Link>}
          {user && <Link to="/" className="navbar-item">User Manager</Link>}
          {user?.isStaff && (<Link to="/user-profiles" className="navbar-item">User Profiles</Link>)}
=======
          {
            user
              ?
              <Link to="/allposts" className="navbar-item">All Posts</Link>
              :
              ""
          }
        </div>
        <div className="navbar-start">
          {
            user
              ?
              <Link to="/myposts" className="navbar-item">My Posts</Link>
              :
              ""
          }
        </div>
        <div className="navbar-start">
          {
            user
              ?
              <Link to="categorymanager" className="navbar-item">Catagory Manager</Link>
              :
              ""
          }
        </div>
        <div className="navbar-start">
          {
            user
              ?
              <Link to="tagmanager" className="navbar-item">Tag Manager</Link>
              :
              ""
          }
        </div>
        <div className="navbar-start">
          {
            user
              ?
              <Link to="/usermanager" className="navbar-item">User Manager</Link>
              :
              ""
          }
>>>>>>> develop
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {user ? (
                <button className="button is-outlined" onClick={() => {
                  setUser('')
                  navigate('/login')
                }}>
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/register" className="button is-link">Register</Link>
                  <Link to="/login" className="button is-outlined">Login</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
