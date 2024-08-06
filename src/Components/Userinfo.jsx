import React, { useEffect, useState } from "react";
import { url, basicInfo } from "./queries";
import './graphs.css';
const UserInfo = () => {

    let token = localStorage.getItem("token");

    const [user, setUser] = useState({});
    const [attributes, setAttributes] = useState({})
    useEffect(() => {
        fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: basicInfo
            })
        }).then(response => response.json())
            .then((data) => {
                setUser(data.data.user[0])
                setAttributes(data.data.user[0].attrs)
            });
    });


    let fullName = `${attributes.firstName || null} ${attributes.lastName || null}`;
    let username = user.login || null;
    let campus = user.campus || null;
    let phone = attributes.Phone || null;
    let email = attributes.email || null;
    let job = attributes.jobtitle || null;

    return (
        <div className="userInfo">
            <h3>Name:&nbsp;</h3><p>{fullName}</p><br />
            <h3>Username:&nbsp;</h3><p>{username}</p><br />
            <h3>Email:&nbsp;</h3><p>{email}</p><br />
            <h3>Job Title:&nbsp;</h3><p>{job}</p> <br />
            <h3>Campus:&nbsp;</h3><p>{campus}</p><br />
            <h3>Phone:&nbsp;</h3><p>{phone}</p>
        </div>
    );


    // console.log(user.attrs)
};

export default UserInfo