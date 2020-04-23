import React from "react";
import { Link } from "react-router-dom";
import "./NavbarComponent.css";

const NavbarComponent = () => {
  return (
    <nav className="navbar-expand-lg navbar-light bg-light">
      <div className="navbar-collapse">
        <i id="cookie-icon" className="fas fa-cookie-bite"></i>
        <Link to="/" className="navbar-brand fas">
          {" "}
          Recipe Finder
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav justify-content-end">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {/*<li className="nav-item">*/}
          {/*<Link to='/login' className='nav-link'>Login</Link>*/}
          {/*</li>*/}
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
          <li className="nav-item" id="privacy-policy">
            <Link to="/privacy-policy" className="nav-link">
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default NavbarComponent;
