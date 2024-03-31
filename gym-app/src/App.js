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
import ViewExercises from "./exercises/viewExercises";
import AddExercise from "./exercises/addExercise";
import UpdateExercise from "./exercises/updateExercise";
import EditTrainer from "./trainer/EditTrainer";
import ViewTrainer from "./trainer/ViewTrainer";
import AssignedMembers from "./trainer/AssignedMembers";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/trainers" element={<TrainerHome />} />
          <Route exact path="/edittrainer/:id" element={<EditTrainer />} />
          <Route exact path="/addTrainer" element={<AddTrainer />} />
          <Route exact path="/viewTrainer" element={<ViewTrainer />} />
          <Route
            exact
            path="/trainers/viewTrainer/:id"
            element={<ViewTrainer />}
          />
          <Route exact path="/members" element={<Home />} />
          <Route exact path="/addmember" element={<AddMember />} />
          <Route exact path="/editmember/:id" element={<EditMember />} />
          <Route exact path="/viewmember/:id" element={<ViewMember />} />
          <Route exact path="/exercises" element={<ViewExercises />} />
          <Route exact path="/exercises/add" element={<AddExercise />} />
          z
          <Route
            exact
            path="/exercises/update/:id"
            element={<UpdateExercise />}
          />
          <Route
            path="/trainers/viewTrainer/assignedMembers"
            element={<AssignedMembers />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
