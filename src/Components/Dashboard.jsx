import React from "react";
import ReceiveAudit from "./Receiveauditgraph";
import SendAudit from "./SendAuditgraph";
import TechGraph from "./technologiesradar";
import SkillsGraph from "./skillsgraph";
import LastFive from "./lastfive";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';import './graphs.css';
import UserInfo from "./Userinfo";
import Logoutbtn from "./logoutbtn";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({auth}) => {
    let token = localStorage.getItem('token')
    // return <Hello/>
    return (<> <div className="both-info"> <UserInfo/> <LastFive/> </div> <div className="piecharts"> <SendAudit/> <ReceiveAudit/> <SkillsGraph/> <TechGraph/> </div> <Logoutbtn auth={auth}/> </>)
}

export default Dashboard