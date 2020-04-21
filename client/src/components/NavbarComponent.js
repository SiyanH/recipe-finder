import React from "react";
import { Link } from 'react-router-dom';

//TODO should navbar change depending on if user is signed in or not? Like Profile link should only
// display should display if a user is logged in and register should only display if not logged in

//TODO add user profile to left side... maybe see how google does it (nicely designed)

//TODO look through navbar bootstrap components to highlight links in the navbar when active and change the font
const NavbarComponent = () => {
    return (
        <nav className='navbar-expand-lg navbar-light bg-light'>
            <div className="collapse navbar-collapse" id="navbarNav">
                <Link to='/' className='navbar-brand fas fa-cookie-bite'> Recipe Finder</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to='/home' className='nav-link'>Home</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to='/login' className='nav-link'>Login</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to='/register' className='nav-link'>Register</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to='/profile' className='nav-link'>Profile</Link>
                    </li>

                </ul>
            </div>

        </nav>
    )
}
export default NavbarComponent
