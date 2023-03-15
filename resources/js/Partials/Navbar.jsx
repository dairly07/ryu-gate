import { Link } from "@inertiajs/react";
import React from "react";

const Navbar = () => {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-widget="pushmenu"
                        href="#"
                        role="button"
                    >
                        <i className="fas fa-bars" />
                    </a>
                </li>
            </ul>
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        href={route('logout')}
                        method="post"
                        role="button"
                    >
                        <i className="fas fa-sign-out-alt" />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
