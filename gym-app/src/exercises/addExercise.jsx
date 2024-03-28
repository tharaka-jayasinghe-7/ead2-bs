import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddExercise() {
  let navigate = useNavigate();

  const [exercise, setExercise] = useState({
    name: "",
    type: "",
  });

  const { name, type } = exercise;

  const onInputChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8082/schedule-ms/exercises", exercise);
    navigate("/exercises");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-justify m-4">Add Exercise</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder=""
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
              <label htmlFor="name">Exercise Name</label>
            </div>
            <div className="mb-2" />
            <div className="form-floating">
              <select
                className="form-select"
                name="type"
                value={type}
                onChange={(e) => onInputChange(e)}
              >
                <option value="">Choose an option</option>
                <option value="Arm Exercise">Arm Exercise</option>
                <option value="Leg Exercise">Leg Exercise</option>
                <option value="Chest Exercise">Chest Exercise</option>
              </select>
              <label htmlFor="type">Exercise Type</label>
            </div>
            <div className="mb-2" />
            <button type="submit" className="btn btn-outline-success">
              Add
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/exercises">
              Back
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
