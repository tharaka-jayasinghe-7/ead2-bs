import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UpdateExercise() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [exercise, setExercise] = useState({
    name: "",
    type: "",
  });

  const { name, type } = exercise;

  const onInputChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadExercises();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:8082/schedule-ms/exercises/${id}`,
      exercise
    );
    navigate("/exercises");
  };

  const loadExercises = async () => {
    const result = await axios.get(
      `http://localhost:8082/schedule-ms/exercises/${id}`
    );
    setExercise(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-justify m-4">Update Exercise</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-floating">
              <input
                type={"text"}
                className="form-control"
                placeholder=""
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              ></input>
              <label for="floatingTextarea">Exercise Name</label>
            </div>
            <div className="mb-2" />
            <div className="form-floating">
              <select
                className="form-select"
                name="type"
                value={type}
                onChange={(e) => onInputChange(e)}
              >
                <option value="Arm Exercise">Arm Exercise</option>
                <option value="Leg Exercise">Leg Exercise</option>
                <option value="Chest Exercise">Chest Exercise</option>
              </select>
              <label for="floatingTextarea">Exercise Type</label>
            </div>
            <div className="mb-2" />
            <button type="submit" className="btn btn-outline-success">
              Update
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
