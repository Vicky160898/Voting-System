import React, { useState } from "react";
import style from "../styles/home.module.css";
import { Toast } from "../utils/toast";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useVoterAuth } from "../components/store/VoterAuthContext";
function Home() {
  //const [voterHasVoted, setVoterHasVoted] = useState(false);
  const { voterId, voterHasVoted, markVoterAsVoted } = useVoterAuth();
  console.log(voterId);
  const handleVote = (candidateId) => {
    if (voterHasVoted) {
      // Display a message or UI indication that the voter has already voted
      Toast("You already voted!");
      return;
    }
    // Cast the vote
    axios
      .post(`/api/vote/<voterId>/${candidateId}`)
      .then((response) => {
        // Vote successful
        voterHasVoted(true);
        // You can show a success message or update UI to reflect the vote
        Toast("Thank You For Your Vote!");
      })
      .catch((error) => {
        console.error("Error casting vote:", error);
      });
  };

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "20px" }}>
        Election Voting Dashboard
      </h1>
      <div style={{ display: "flex" }}>
        <div className={style.card}>
          <img
            src="https://pbs.twimg.com/media/EaURZEbUEAEqmw9.png"
            alt="John"
            style={{ width: "70%" }}
          />
          <h1>Congress</h1>
          <p className={style.title}>John Doe</p>
          <p>
            <button onClick={handleVote}>Vote</button>
          </p>
        </div>
        <div className={style.card}>
          <img
            src="https://img.etimg.com/thumb/width-640,height-480,imgsize-112756,resizemode-75,msid-81655086/news/elections/assembly-elections/assam/bjp-is-the-only-secular-party-never-deprived-anyone-of-religious-freedoms-says-assam-cm/untitled-design-2020-10-02t213257-974.jpg"
            alt="John"
            style={{ width: "100%" }}
          />
          <h1>BJP</h1>
          <p className={style.title}>John Doe</p>
          <p>
            <button onClick={handleVote}>Vote</button>
          </p>
        </div>
        <div className={style.card}>
          <img
            src="data:image/png;base64,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"
            alt="John"
            style={{ width: "100%" }}
          />
          <h1>Nota</h1>
          <p className={style.title}>John Doe</p>
          <p>
            <button onClick={handleVote}>Vote</button>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Home;
