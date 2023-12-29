import React, { createContext, useContext, useState } from "react";

// Create a context
const VoterAuthContext = createContext();

// Create a provider component
export const VoterAuthProvider = ({ children }) => {
  const [voterId, setVoterId] = useState(null);
  const [voterHasLogin, setVoterHasLogin] = useState(false);
  const [adminHasLogin, setAdminHasLogin] = useState(false);

  // Function to authenticate the voter
  const authenticateVoter = (id) => {
    setVoterId(id);
    // You can also fetch the voter's voting status here and set `voterHasVoted`
  };

  // Function to mark the voter as voted
  const markVoterAsLogin = () => {
    setVoterHasLogin(!voterHasLogin);
  };

  // Function to mark the Admin
  const markAdminAsLogin = (data) => {
    setAdminHasLogin(data);
  };

  // Provide the context values to children components
  return (
    <VoterAuthContext.Provider
      value={{
        voterId,
        voterHasLogin,
        authenticateVoter,
        markVoterAsLogin,
        adminHasLogin,
        markAdminAsLogin,
      }}
    >
      {children}
    </VoterAuthContext.Provider>
  );
};

// Custom hook to access the context values
export const useVoterAuth = () => {
  return useContext(VoterAuthContext);
};
