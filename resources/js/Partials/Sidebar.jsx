import { Link } from "@inertiajs/react";
import React from "react";

const Sidebar = ({ auth }) => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href={route('home')} className="brand-link text-center">
                <span className="brand-text font-weight-light">Ryu Gate</span>
            </a>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="info">
                        <a href="#" className="d-block">
                            <i className="fas fa-user-circle text-white mr-2" style={{ fontSize: '1.5rem' }}></i>
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
                        <li className="nav-item mb-1">
                            <Link href={route('dashboard')} className={`nav-link ${route().current('dashboard') ? 'active' : ''}`}>
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        <li className="nav-item mb-1">
                            <Link href={route('late-students.index')} className={`nav-link ${route().current('late-students.*') ? 'active' : ''}`}>
                                <i className="nav-icon fas fa-door-open" />
                                <p>Siswa Terlambat</p>
                            </Link>
                        </li>
                        <li className="nav-header">MASTER DATA</li>
                        <li className="nav-item mb-1">
                            <Link href={route('classrooms.index')} className={`nav-link ${route().current('classrooms.*') ? 'active' : ''}`}>
                                <i className="nav-icon fas fa-table" />
                                <p>Kelas</p>
                            </Link>
                        </li>
                        <li className="nav-item mb-1">
                            <Link href={route('students.index')} className={`nav-link ${route().current('students.*') ? 'active' : ''}`}>
                                <i className="nav-icon fas fa-graduation-cap" />
                                <p>Siswa</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
