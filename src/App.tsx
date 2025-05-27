import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useGetPatientStatus } from "./functions/patientStatusFunctions";

function App() {
  useGetPatientStatus()
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
