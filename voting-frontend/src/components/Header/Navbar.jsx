import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useVoterAuth } from "../store/VoterAuthContext";
function Navbar() {
  const { voterHasLogin, adminHasLogin, markVoterAsLogin, markAdminAsLogin } =
    useVoterAuth();

  const handleRedirect = () => {
    markVoterAsLogin();
    markAdminAsLogin(false);
  };

  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          {adminHasLogin && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}

          {(voterHasLogin || adminHasLogin) && (
            <li>
              <Link to="/" onClick={handleRedirect}>
                LogOut
              </Link>
            </li>
          )}

          {adminHasLogin && (
            <li style={{ float: "right" }}>
              <Link className="active" to="/add">
                Add Candidate
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
