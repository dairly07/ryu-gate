import { Link } from "@inertiajs/react";
import React from "react";

const Sidebar = ({ auth }) => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href={route('home')} className="brand-link">
                <img
                    src="dist/img/AdminLTELogo.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{ opacity: ".8" }}
                />
                <span className="brand-text font-weight-light">Ryu Gate</span>
            </a>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            src="dist/img/user2-160x160.jpg"
                            className="img-circle elevation-2"
                            alt="User Image"
                        />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">
                            {auth.user.name}
                        </a>
                    </div>
                </div>
                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        <li className="nav-item mb-3">
                            <Link href={route('dashboard')} className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        <li className="nav-header">MASTER DATA</li>
                        <li className="nav-item mb-3">
                            <Link href={route('classrooms.index')} className="nav-link">
                                <i className="nav-icon fas fa-table" />
                                <p>Kelas</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
