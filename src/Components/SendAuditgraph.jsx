import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { url, querySendAuditPass, querySendAuditFail } from "./queries";
import "./graphs.css";

const SendAudit = () => {

    const [passCount, setPassCount] = useState();
    const [failCount, setFailCount] = useState();


    fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: querySendAuditPass
        })
    })
        .then(response => response.json())
        .then((data) => {
            setPassCount(data.data.user[0].audits_aggregate.aggregate.count);
        })
        .catch(error => console.error('Error:', error));

    fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: querySendAuditFail
        })
    })
        .then(response => response.json())
        .then((data) => {
            setFailCount(data.data.user[0].audits_aggregate.aggregate.count);
        })
        .catch(error => console.error('Error:', error));

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: '#FFFFFF' // Change this to the desired color
                }
            }
        }
    };

    let graphData = {
        labels: ['Pass', 'Fail'],
        datasets: [
            {
                data: [passCount, failCount],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    // { title: 'Three', value: 20, color: '#6A2135' },
    return (<div className="audit-receive-div">
        <h2> Audits Done </h2>
        <Doughnut
            data={graphData} options={options}
        />
    </div>)
}

export default SendAudit