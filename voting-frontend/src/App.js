import "./App.css";
import AllRoutes from "./Router/AllRoutes";
import Navbar from "./components/Header/Navbar";
import { VoterAuthProvider } from "./components/store/VoterAuthContext";

function App() {
  return (
    <div className="App">
      <VoterAuthProvider>
        <Navbar />
        <AllRoutes />
      </VoterAuthProvider>
    </div>
  );
}

export default App;
