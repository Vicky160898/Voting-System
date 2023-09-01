import React, { useState } from "react";
import axios from "axios";
import style from "../styles/home.module.css";
import { Toast } from "../utils/toast";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CandidateGenerator = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const navigate = useNavigate();
  const generateCandidates = async () => {
    const res = await axios.get("http://localhost:8080/api/candidate/generate");
    console.log("res", res.data.data);
    setCandidates([...candidates, ...res.data.data]);
  };

  const handleCandidateSelection = async (candidateId) => {
    console.log(candidateId);
    if (selectedCandidates.includes(candidateId)) {
      setSelectedCandidates(
        selectedCandidates.filter((id) => id !== candidateId)
      );
    } else {
      setSelectedCandidates([...selectedCandidates, candidateId]);
    }
  };

  const handleStartElection = async () => {
    if (!startTime || !endTime || selectedCandidates.length < 2) {
      Toast(
        "Please select a valid start date, end date, and at least two candidates."
      );
      return;
    }
    try {
      console.log(startTime, endTime, selectedCandidates);
      const response = await axios.post(
        "http://localhost:8080/api/election/start",
        {
          startTime,
          endTime,
          selectedCandidates, // Pass the array of selected candidate IDs
        }
      );
      if (response.status === 200) {
        Toast("Election Started succefully.");
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      } else {
        Toast("Something Went Wrong.");
      }
    } catch (error) {
      console.error("Error starting election:", error);
    }
  };

  const today = new Date();

  // useEffect(() => {
  //   if (startDate && endDate) {
  //     const timeDifference = endDate.getTime() - startDate.getTime();
  //     setRemainingTime(timeDifference);
  //     const interval = setInterval(() => {
  //       setRemainingTime((prevTime) => prevTime - 1000);
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }
  // }, [startDate, endDate]);

  // const formatRemainingTime = (milliseconds) => {
  //   const seconds = Math.floor(milliseconds / 1000) % 60;
  //   const minutes = Math.floor(milliseconds / 1000 / 60) % 60;
  //   const hours = Math.floor(milliseconds / 1000 / 60 / 60);

  //   return `${hours}h ${minutes}m ${seconds}s`;
  // };

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "250px",
            margin: "20px auto auto auto",
          }}
        >
          <button
            style={{ width: "100%", padding: "15px" }}
            onClick={generateCandidates}
          >
            Generate Candidates
          </button>
        </div>
        <div
          style={{
            width: "70%",
            margin: "auto",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {candidates.map((candidate) => (
            <div
              className={style.card}
              key={candidate._id}
              style={{ width: "35%", marginBottom: "20px" }}
            >
              <img
                src={candidate.avatar}
                alt={candidate.name}
                style={{ width: "50%", borderRadius: "50%" }}
              />
              <p className={style.title} style={{ margin: "15px auto" }}>
                {candidate.name}
              </p>
              <p>
                <button
                  style={{ width: "200px" }}
                  onClick={() => handleCandidateSelection(candidate._id)}
                >
                  {selectedCandidates.includes(candidate._id)
                    ? "Remove from Election"
                    : "Add to Election"}
                </button>
              </p>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "40%",
            margin: "auto",
          }}
        >
          <label>
            Election Start Date:<span style={{ color: "red" }}>*</span>{" "}
          </label>
          <DatePicker
            selected={startTime}
            showTimeSelect
            minDate={today}
            onChange={(date) => setStartTime(date)}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select start date and time"
          />
          <br />
          <label>
            Election End Date:<span style={{ color: "red" }}>*</span>
          </label>
          <DatePicker
            className="custom-datepicker"
            selected={endTime}
            showTimeSelect
            minDate={startTime || today}
            onChange={(date) => setEndTime(date)}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select end date and time"
          />
          <button style={{ marginTop: "20px" }} onClick={handleStartElection}>
            Start Election
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CandidateGenerator;
