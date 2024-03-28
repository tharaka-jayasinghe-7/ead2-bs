import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import TrainerHome from "./pages/TrainerHome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddTrainer from "./trainer/AddTrainer";
import Dashboard from "./layout/Dashboard";
import AddMember from "./members/AddMembers";
import EditMember from "./members/UpdateMembers";
import ViewMember from "./members/ViewMembers";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/trainers" element={<TrainerHome />} />
          <Route exact path="/members" element={<Home />} />
          <Route exact path="/addTrainer" element={<AddTrainer />} />
          <Route exact path="/addmember" element={<AddMember />} />
          <Route exact path="/editmember/:id" element={<EditMember />} />

          <Route exact path="/viewmember/:id" element={<ViewMember />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
