import React, { useEffect, useState } from "react";
import style from "../styles/dashboard.module.css";
import axios from "axios";

function Dashboard() {
  const [Data, setData] = useState([]);

  const FetchElection = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/election/results");
      if (res.data.success) {
        setData(res.data.data);
      } else {
        console.log("Something went wrong.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    FetchElection();
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>Election Result Dashboard</h1>
      {Data.map((election, index) => (
        <div key={index} className={style.card}>
          <h2 style={{ padding: "8px" }}>Election Result :- {index + 1}</h2>
          <ul className={style.title}>
            {Object.entries(election).map(
              ([candidateName, voteCount]) =>
                candidateName !== "id" && (
                  <li key={candidateName} className={style.resultItem}>
                    {candidateName}: {voteCount} Votes
                  </li>
                )
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
