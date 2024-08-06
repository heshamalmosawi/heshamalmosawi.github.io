import React, { useEffect, useState } from "react";
import { url, queryLastfive } from "./queries";

const LastFive = () => {
    const [info, setInfo] = useState(['']);

    let token = localStorage.getItem("token");

    // getting data for graphs 
    useEffect(() => {
        fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: queryLastfive
            })
        })
            .then(response => response.json())
            .then((data) => {
                const transactionNames = data.data.transaction.map(transaction => transaction.object.name);
                setInfo(transactionNames);
            })
    }, []);

    return (
        <div className="last5container">    
        <h3>Last five projects:</h3><br />
    <div className="last-five">
        {info.map((item, index) => (
        <ol> <div key={index}>{index+1}. {item}</div></ol>
      ))}
    </div></div>
)
};

export default LastFive