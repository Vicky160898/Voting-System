import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import Add from "../Pages/Add";
import { useVoterAuth } from "../components/store/VoterAuthContext";

function AllRoutes() {
  const { adminHasLogin } = useVoterAuth();
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      {adminHasLogin && (
        <>
          <Route path="/dashboard" element={<Dashboard />} />{" "}
          <Route path="/add" element={<Add />} />
        </>
      )}
    </Routes>
  );
}

export default AllRoutes;
