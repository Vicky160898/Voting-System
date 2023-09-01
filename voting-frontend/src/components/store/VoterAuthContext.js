import React, { createContext, useContext, useState } from "react";

// Create a context
const VoterAuthContext = createContext();

// Create a provider component
export const VoterAuthProvider = ({ children }) => {
  const [voterId, setVoterId] = useState(null);
  const [voterHasVoted, setVoterHasVoted] = useState(false);

  // Function to authenticate the voter
  const authenticateVoter = (id) => {
   
    setVoterId(id);
    // You can also fetch the voter's voting status here and set `voterHasVoted`
  };

  // Function to mark the voter as voted
  const markVoterAsVoted = () => {
    setVoterHasVoted(true);
  };


  // Provide the context values to children components
  return (
    <VoterAuthContext.Provider
      value={{ voterId, voterHasVoted, authenticateVoter, markVoterAsVoted }}
    >
      {children}
    </VoterAuthContext.Provider>
  );
};

// Custom hook to access the context values
export const useVoterAuth = () => {
  return useContext(VoterAuthContext);
};
