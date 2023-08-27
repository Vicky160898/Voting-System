// import React, { useState } from "react";
// import style from "../styles/add.module.css";
// import axios from "axios";
// import { Toast } from "../utils/toast";
// import { ToastContainer } from "react-toastify";
// function Add() {
//   const [state, setState] = useState({ name: "", partyName: "" });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post("http://localhost:8080/api/candidate/add", state);
//     Toast("Candidate Added Successfully");
//     return;
//   };

//   return (
//     <>
//       <div className={style.login}>
//         <div className={style.login_triangle}></div>
//         <h2 className={style.login_header}>Candidate</h2>
//         <form onSubmit={handleSubmit} className={style.login_container}>
//           <p>
//             <input
//               type="text"
//               name="name"
//               value={state.name}
//               onChange={handleChange}
//               placeholder="Enter candidate name"
//             />
//           </p>
//           <p>
//             <input
//               type="text"
//               name="partyName"
//               onChange={handleChange}
//               value={state.partyName}
//               placeholder="Enter candidate party name"
//             />
//           </p>
//           <p>
//             <label>Add Party logo</label>
//             <input type="file" />
//           </p>
//           <p>
//             <button style={{ backgroundColor: "#2288DD" }} type="submit">
//               ADD
//             </button>
//           </p>
//         </form>
//       </div>
//       <ToastContainer />
//     </>
//   );
// }

// export default Add;

import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import axios from "axios";
import style from "../styles/home.module.css";
import { Toast } from "../utils/toast";
import { ToastContainer } from "react-toastify";
const CandidateGenerator = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const generateCandidates = async () => {
    const res = await axios.get("http://localhost:8080/api/candidate/generate");
    console.log("res", res.data);

    //setCandidates([...candidates, ...newCandidates]);
  };

  const handleCandidateSelection = (candidateId) => {
    if (selectedCandidates.includes(candidateId)) {
      setSelectedCandidates(
        selectedCandidates.filter((id) => id !== candidateId)
      );
    } else {
      setSelectedCandidates([...selectedCandidates, candidateId]);
    }
  };

  const handleStartElection = async () => {
    // Check if start date, end date, and selected candidates are valid
    console.log(startDate, endDate, selectedCandidates);
    if (!startDate || !endDate || selectedCandidates.length < 2) {
      Toast(
        "Please select a valid start date, end date, and at least two candidates."
      );
      return;
    }

    // Assuming you have a backend API endpoint for starting the election
    const payload = {
      candidates: selectedCandidates,
      startDate,
      endDate,
    };

    try {
      const response = await axios.post("/api/start-election", payload);
      console.log("Election started:", response.data);
    } catch (error) {
      console.error("Error starting election:", error);
    }
  };

  return (
    <>
      <div>
        <button onClick={generateCandidates}>Generate Candidates</button>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {candidates.map((candidate) => (
            <div className={style.card} key={candidate.id}>
              <img
                src={candidate.image}
                alt={candidate.name}
                style={{ width: "70%" }}
              />
              <h1>Congress</h1>
              <p className={style.title}>{candidate.name}</p>
              <p>
                <button onClick={() => handleCandidateSelection(candidate.id)}>
                  {selectedCandidates.includes(candidate.id)
                    ? "Remove from Election"
                    : "Add to Election"}
                </button>
              </p>
            </div>
          ))}
        </div>
        <div>
          <label>
            Start Date:{" "}
            <input type="date" onChange={(e) => setStartDate(e.target.value)} />
          </label>
          <label>
            End Date:{" "}
            <input type="date" onChange={(e) => setEndDate(e.target.value)} />
          </label>
        </div>
        <button
          onClick={handleStartElection}
          disabled={selectedCandidates.length < 2 || !startDate || !endDate}
        >
          Start Election
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default CandidateGenerator;
