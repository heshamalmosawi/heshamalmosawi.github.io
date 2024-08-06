import React from "react";

const Logoutbtn = ({ auth }) => {
    const handleLogout =() => {
        localStorage.removeItem('token');
        auth(false);
    };

    return (<button onClick={handleLogout} id="logout-btn"><strong> Logout</strong></button>)
};

export default Logoutbtn