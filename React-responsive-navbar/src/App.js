import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cse from "./components/Pages/cse/Cse";
import PaperList from "./components/Pages/cse/PaperList";
import Entc from "./components/Pages/entc/Entc";
import EntcPaperList from "./components/Pages/entc/PaperList";
import Home from "./components/Pages/Home";


function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cse" element={<Cse />} />
        <Route path="/entc" element={<Entc />} />

        {/* Dynamic route for papers */}
        <Route
          path="/cse/year/:year/sem/:sem/:season/:paperYear"
          element={<PaperList />}
        />
        <Route
          path="/entc/year/:year/sem/:sem/:season/:paperYear"
          element={<EntcPaperList />}
        />
      </Routes>
      
    </Router>
  );
}

export default App;
