import React, { useEffect, useState } from "react";
import style from "../styles/home.module.css";
import { Toast } from "../utils/toast";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useVoterAuth } from "../components/store/VoterAuthContext";
function Home() {
  const [data, setData] = useState([]);
  const { voterId } = useVoterAuth();
  const handleVote = async (electionId, candidateId) => {
    try {
      const response = await axios.post("http://localhost:8080/api/vote", {
        voterId,
        candidateId,
        electionId,
      });
      if (response.status === 200) {
        Toast("Vote cast successfully.");
      } else {
        Toast(data.error);
      }
    } catch (error) {
      Toast("Failed to cast vote!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/election/all"
        );
        const elections = response.data.data.map((election) => ({
          ...election,
          remainingTime: calculateRemainingTime(election.endTime),
        }));
        setData(elections);
      } catch (error) {
        console.error("Error fetching election data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((election) => ({
          ...election,
          remainingTime: calculateRemainingTime(election.endTime),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateRemainingTime = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const remainingTime = end - now;
    return remainingTime > 0 ? remainingTime : 0;
  };

  const formatRemainingTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / 1000 / 60) % 60;
    const hours = Math.floor(milliseconds / 1000 / 60 / 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const getStatusMessage = (remainingTime) => {
    if (remainingTime <= 0) {
      return "Election Ended See Result On Dashboard";
    } else {
      return `Election Time Remaining: ${formatRemainingTime(remainingTime)}`;
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "20px 0px 0px 0px" }}>
        Election Voting Dashboard
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginBottom: "50px",
        }}
      >
        {data.length > 0 ? (
          data?.map((el) => (
            <div
              className={style.card}
              key={el._id}
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#ffffff",
                  margin: "20px 0px",
                }}
              >
                {el.remainingTime !== undefined && (
                  <div>
                    <h2>{getStatusMessage(el.remainingTime)}</h2>
                  </div>
                )}
              </div>

              <div
                style={{
                  width: "90%",
                  display: "flex",
                  flexWrap: "wrap",
                  marginTop: "20px",
                }}
              >
                {el.candidates.map((candidate) => (
                  <div
                    key={candidate._id}
                    style={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={candidate.avatar}
                      alt="John"
                      style={{ width: "45%", borderRadius: "50%" }}
                    />
                    <p className={style.title}>{candidate.name}</p>
                    <p>
                      <button onClick={() => handleVote(el._id, candidate._id)}>
                        Vote
                      </button>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <h1 style={{ textAlign: "center", margin: "100px auto auto auto" }}>
            Election Not Found
          </h1>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default Home;
