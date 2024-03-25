import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import TrainerHome from "./pages/TrainerHome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddTrainer from "./trainer/AddTrainer";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<TrainerHome />} />
          <Route exact path="/addTrainer" element={<AddTrainer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
