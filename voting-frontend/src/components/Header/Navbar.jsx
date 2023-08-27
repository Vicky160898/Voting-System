import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li style={{ float: "right" }}>
            <Link className="active" to="/add">
              Add Candidate
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
