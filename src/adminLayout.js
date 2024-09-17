import React from "react";

const AdminLayout = (props) => {
    return (
        <>
            <section className="section">
                <div className="container">
                    <div id="page-content">
                        <h1>ADMIN</h1>
                        {props.children}
                    </div>
                </div>
            </section>

        </>
    )
}
export default AdminLayout;
