import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

const NavBar = props => {

    return (
        <div>
            {/* Navbar Implementation in all pages using BootStrap */}
            <nav className="navbar navbar-expand-lg p-3 navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="/">
                    ONLINE BOOK STORE
        </NavLink>
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
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">
                                Home
              </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {/*Renders Login and Signup if isLoggedIn is true and cart,logout if isLoggedIn is false*/}
                        {props.isloggedIn === true ?
                            <React.Fragment>
                                <NavLink className='nav-link mr-3 ' to='/login'>Log In</NavLink>
                                <NavLink className='nav-link' to='/register'>Sign Up</NavLink>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <NavLink className="nav-link mr-3" to="/shoppingcart"><AiOutlineShoppingCart /></NavLink>
                                <NavLink className='nav-link' to='/logout' onClick={props.setLogin}>Log Out</NavLink>
                            </React.Fragment>

                        }
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;

