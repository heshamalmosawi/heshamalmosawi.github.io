import React, { useEffect, useState } from "react";
import { PieChart, Pie, Legend, Cell, ResponsiveContainer, Label } from "recharts";
import { url, queryReceiveAuditPass, queryReceiveAuditFail } from "./queries";
import "./graphs.css";

const Bullet = ({ backgroundColor, size }) => {
  return (
    <div
      className="CirecleBullet"
      style={{
        backgroundColor,
        width: size,
        height: size,
      }}
    ></div>
  );
};

const CustomizedLegend = (props) => {
  const { payload } = props;
  return (
    <ul className="LegendList" style={{ listStyleType: 'none', padding: 0 }}>
      {payload.map((entry, index) => (
        <li key={`item-${index}`}>
          <div className="BulletLabel">
            <Bullet backgroundColor={entry.payload.fill} size="10px" />
            <div className="BulletLabelText">{entry.value}</div>
          </div>
          <div style={{ marginLeft: "20px" }}>{entry.payload.value}</div>
        </li>
      ))}
    </ul>
  );
};

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

  const COLORS = ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"];

  let graphData = [
    { name: "Pass", value: passCount }, { name: "Fail", value: failCount }
  ]

  return (<div className="graph-div">
    <h2> Audits Received </h2>
    <ResponsiveContainer>
        <PieChart>
          <Pie
            data={graphData}
            dataKey="value"
            cx={200}
            cy={200}
            innerRadius={80}
            outerRadius={130}
          >
            {graphData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend content={<CustomizedLegend />} />
        </PieChart>
      </ResponsiveContainer>
  </div>)
}

export default ReceiveAudit