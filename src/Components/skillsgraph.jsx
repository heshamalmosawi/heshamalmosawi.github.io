import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import { url, querySkills } from "./queries";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { PointerIcon } from "lucide-react";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const SkillsGraph = () => {

    let token = localStorage.getItem("token")

    const [skills, setSkills] = useState({});
    useEffect(() => {
        fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: querySkills
            })
        })
            .then(response => response.json())
            .then((data) => {
                const newSkills = { ...skills };
                data.data.transaction.forEach(transaction => {
                    const { type, amount } = transaction;

                    if (!newSkills[type] || amount > newSkills[type]) {
                        newSkills[type] = amount;
                    }
                    setSkills(newSkills);
                });
            })
    }, [])

    const skillTypes = ["skill_back-end", "skill_front-end", "skill_algo", "skill_ai", "skill_game", "skill_stats", "skill_tcp", "skill_sys-admin", "skill_unix"];
    const chartData = skillTypes.map(type => skills[type] || 0);
    const data = {
        labels: ["Back-End", "Front-End", "Algorithms", "AI", "Game", "Statistics", "TCP", "Sys-Admin", "Unix"],
        datasets: [
            {
                label: "Skill gained",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: chartData,
                pointBackgroundColor: 'rgba(0, 0, 0, 0)', // Point color
                // pointHoverBackgroundColor: '#fff', // Point hover background color
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: '#FFFFFF' // Legend label color
                }
            }
        },
        scales: {
            r: {
                angleLines: {
                    display: true,
                    color: '#FFFFFF' // Color of the lines radiating from the center
                },
                grid: {
                    color: '#FFFFFF' // Color of the circular grid lines
                },
                pointLabels: {
                    color: '#FFFFFF' // Color of the labels around the edge
                },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    stepSize: 20
                }
            }
        }
    };

    return (
        <div className="graph-div">
            <h2>Technical Skills</h2>
            <Radar data={data} options={options} />
        </div>
    );
};

export default SkillsGraph