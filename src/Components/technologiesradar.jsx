import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import { url, querySkills } from "./queries";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const TechGraph = () => {

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
    }, []);

    // console.log(skills)
    const skillTypes = ["skill_go", "skill_c", "skill_html", "skill_css", "skill_js", "skill_docker", "skill_sql", "skill_graphql"];
    const chartData = skillTypes.map(type => skills[type] || 0);
    const data = {
        labels: ["Go", "C Language", "HTML", "CSS", "Javascript", "Docker", "SQL", "GraphQL"],
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
            <h2>Technologies Learned</h2>
            <Radar data={data} options={options} />
        </div>
    );
};

export default TechGraph