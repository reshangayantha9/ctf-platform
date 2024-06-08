import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/Actions/authActions";
import  toast from 'react-hot-toast';
function Navbar() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
   
    if (auth.user) {
      setIsLoggedIn(true);
    }else {
      setIsLoggedIn(false);
    } 
  }, [auth]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    dispatch(logout());    
    toast.success('Logout successful!');
    
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light sticky-top "
      style={{ backgroundColor: "var(--primary-color)" }}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Hack Hunter
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                exact
                activeClassName="active"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/users"
              >
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/teams"
              >
                Teams
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/scoreboard"
              >
                Scoreboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/challenge"
              >
                Challenge
              </NavLink>
            </li>
          </ul>
          <div className="nav-item">
            {isLoggedIn ? (
              <>
                <div className="d-flex">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/profile"
                  >
                    <i class="bi bi-person-circle"></i>{" "}
                    &nbsp;Profile&nbsp;&nbsp;
                  </NavLink>
                  <button className="btn" style={{color:'var(--text-color)'}}onClick={handleLogout}>
                    <i class="bi bi-box-arrow-right"></i>&nbsp;Logout
                  </button>
                </div>
              </>
            ) : (
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/login"
              >
                <i class="bi bi-door-open"></i> &nbsp;Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
