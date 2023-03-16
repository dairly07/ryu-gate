import React from "react";

const Content = ({ children }) => {
    return (
        <section className="content">
            <div className="container-fluid">
                {children}
            </div>
        </section>
    );
};

export default Content;
