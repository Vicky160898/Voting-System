import React, { useState } from "react";
import style from "../styles/login.module.css";
import { Toast } from "../utils/toast";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useVoterAuth } from "../components/store/VoterAuthContext";
function Login() {
  const { authenticateVoter, markVoterAsLogin, markAdminAsLogin } =
    useVoterAuth();
  const [voterid, setID] = useState("");
  const navigate = useNavigate();
  const Loginhandler = async () => {
    const response = await axios.post(`http://localhost:8080/api/login`, {
      ID: voterid,
    });

    authenticateVoter(response.data.data?.voterID);
    markVoterAsLogin(true);
    Toast("Login Successful");
    setTimeout(() => {
      navigate("/home");
    }, 3000);
    return;
  };

  const AdminLoginhandler = async () => {
    const response = await axios.post(`http://localhost:8080/api/login`, {
      ID: "admin@1234",
    });

    authenticateVoter(response.data?.voterID);
    markVoterAsLogin(true);
    if (response.data.isAdmin) {
      markAdminAsLogin(response.data.isAdmin);
      Toast("Admin login Successfully");
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  };

  const VoterIDhandler = async () => {
    const response = await axios.get("http://localhost:8080/api/create");
    setID(response.data.data.voterID);
    Toast("Voter ID Generated Successfully");
    return;
  };

  return (
    <>
      <div className={style.login}>
        <div className={style.login_triangle}></div>

        <h2 className={style.login_header}>Log in</h2>

        <div className={style.login_container}>
          <p>
            <input
              type="text"
              value={voterid}
              onChange={(e) => setID(e.target.value)}
              placeholder="Enter Voter ID"
            />
          </p>
          <button
            style={{ marginBottom: "15px" }}
            className={style.btn}
            onClick={VoterIDhandler}
          >
            Create Voter Id
          </button>
          <button className={style.btn} onClick={Loginhandler}>
            Log in
          </button>
          <button className={style.btn} onClick={AdminLoginhandler}>
            Admin Log in
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
