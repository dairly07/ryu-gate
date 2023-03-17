import Navbar from "@/Partials/Navbar";
import Sidebar from "@/Partials/Sidebar";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import { ToastContainer } from 'react-toastify';

const MainLayout = ({ children, title, auth }) => {
    return (
        <div className="wrapper">
            <Head title={title}/>
            <Navbar />
            <Sidebar auth={auth}/>
            <div className="content-wrapper">
                {children}
            </div>
            <footer className="main-footer">
                <strong>
                    Copyright © {" "}
                    <Link href={route('home')}>Ryu Gate</Link>.{" "}
                </strong>
                All rights reserved.
            </footer>
            <ToastContainer />
        </div>
    );
};

export default MainLayout;
