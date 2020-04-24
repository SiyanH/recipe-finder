import React from "react";
import { Link } from "react-router-dom";
import userService from "../services/userService";
import "./NavbarComponent.css";
import { connect } from "react-redux";
import { logout } from "../services/userService";

class NavbarComponent extends React.Component {
  state = {
    users: [],
    navCollapsed: true,
  };

  componentDidMount() {
    userService.findAllUsers().then((response) => {
      this.setState({ users: response.data });
    });
  }

  toggleNav = () => {
    this.setState({ navCollapsed: !this.state.navCollapsed });
  };

  render() {
    const { navCollapsed } = this.state;
    return (
      <nav className="navbar-expand-sm navbar-light bg-light">
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
            onClick={this.toggleNav}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={(navCollapsed ? "collapse" : "") + " navbar-collapse"}
          >
            <ul className="navbar-nav justify-content-end">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              {this.props.userRole === undefined && (
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              )}
              {this.props.userRole === undefined && (
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              )}
              {(this.props.userRole === "USER" ||
                this.props.userRole === "ADMIN") && (
                <li className="nav-item">
                  <a className="nav-link" href="/" onClick={logout}>
                    Logout
                  </a>
                </li>
              )}
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
        </div>
      </nav>
    );
  }
}
const stateToPropertyMapper = (state) => {
  return {
    userRole: state.user.profile.role,
  };
};

export default connect(stateToPropertyMapper)(NavbarComponent);
