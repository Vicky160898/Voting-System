import React from "react";
import "./App.css";
import AllRoutes from "./Router/AllRoutes";
import Navbar from "./components/Header/Navbar";
import {
  VoterAuthProvider,
  useVoterAuth,
} from "./components/store/VoterAuthContext";

function App() {
  return (
    <div className="App">
      <VoterAuthProvider>
        <AppContent />
      </VoterAuthProvider>
    </div>
  );
}

function AppContent() {
  const { voterHasLogin } = useVoterAuth();

  return (
    <>
      {voterHasLogin && <Navbar />}
      <AllRoutes />
    </>
  );
}

export default App;
