import React, { useEffect, useState } from "react";
import style from "../styles/dashboard.module.css";
import { Toast } from "../utils/toast";
import axios from "axios";
import { ToastContainer } from "react-toastify";

function Dashboard() {
  const [Data, setData] = useState([]);

  const FetchElection = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/election/results");
      if (res.data.success) {
        setData(res.data.data);
      } else {
        Toast("Something went wrong.");
      }
    } catch (error) {
      Toast(error);
    }
  };

  useEffect(() => {
    FetchElection();
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>Election Result Dashboard</h1>
      {Data.length > 0 ? (
        Data.map((election, index) => (
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
        ))
      ) : (
        <h1 style={{ textAlign: "center", margin: "100px auto auto auto" }}>
          Election Result Not Found
        </h1>
      )}
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
