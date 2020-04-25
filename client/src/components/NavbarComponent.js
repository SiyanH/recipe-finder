import React from "react";
import {Link} from "react-router-dom";
import {profile} from "../services/userService";
import "./NavbarComponent.css";
import {connect} from "react-redux";
import {logout} from "../services/userService";
import {findProfile} from "../actions/userActions";

class NavbarComponent extends React.Component {
    state = {
        users: [],
        navCollapsed: true
    };

    componentDidMount() {
        if (!this.props.userId) {
            this.props.findProfile().then();
        }
    }

    toggleNav = () => {
        this.setState({navCollapsed: !this.state.navCollapsed})
    };

    render() {
        const {navCollapsed} = this.state
        return (
            <nav className="navbar-expand-sm navbar-light bg-light">
                {/*BRAND HEADING*/}
                <div className="navbar-collapse">
                    <i id="cookie-icon" className="fas fa-cookie-bite"></i>
                    <Link to="/" className="navbar-brand fas">
                        {" "}
                        Recipe Finder
                    </Link>
                    {/* COLLAPSING TOGGLE BUTTON*/}
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

                    {/*NAVBAR LINKS*/}
                    <div className={(navCollapsed ? 'collapse' : '') + ' navbar-collapse'}>
                        <ul className="navbar-nav justify-content-end">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    Home
                                </Link>
                            </li>

                            {this.props.userRole === undefined && (
                                <li className="nav-item">
                                    <Link to='/login' className='nav-link'>Login</Link>
                                </li>
                            )}
                            {this.props.userRole === undefined && (
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">
                                        Register
                                    </Link>
                                </li>
                            )}
                            {(this.props.userRole === 'USER' || this.props.userRole === 'ADMIN')
                             && (
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
                            <li className="nav-item">
                                <Link to="/privacy-policy" className="nav-link">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const stateToPropertyMapper = (state) => {
    return {
        userRole: state.user.profile.role,
        userId: state.user.profile._id
    };
};

const dispatchToPropertyMapper = (dispatch) => {
    return {
        findProfile: () =>
            profile().then(profile => dispatch(findProfile(profile.data))),
    };
};

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(NavbarComponent);
