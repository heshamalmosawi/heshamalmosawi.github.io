import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { url, queryReceiveAuditPass, queryReceiveAuditFail } from "./queries";
import "./graphs.css";

const ReceiveAudit = () => {

  // to set and use them out of the fetch functions
  const [passCount, setPassCount] = useState(0);
  const [failCount, setFailCount] = useState(0);
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
        query: queryReceiveAuditPass
      })
    })
      .then(response => response.json())
      .then((data) => {
        setPassCount(data.data.audit_aggregate.aggregate.count);
      })
  }, []);

  useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queryReceiveAuditFail
      })
    })
      .then(response => response.json())
      .then((data) => {
        setFailCount(data.data.audit_aggregate.aggregate.count);
      })
  }, []);

  console.log("pass count: ", passCount);
  console.log("fail count: ", failCount);

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

  return (<div className="graph-div">
    <h2> Audits Received </h2>
    <Doughnut
      data={graphData} options={options}
    />
  </div>)
}

export default ReceiveAudit