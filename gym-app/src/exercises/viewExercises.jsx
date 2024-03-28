import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ViewExercises() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    loadExercises();
  }, []);

  const { id } = useParams();

  const loadExercises = async () => {
    const result = await axios.get(
      "http://localhost:8082/schedule-ms/exercises"
    );
    setExercises(result.data);
  };

  const deleteExercise = async (id) => {
    await axios.delete(`http://localhost:8082/schedule-ms/exercises/${id}`);
    loadExercises();
  };

  return (
    <div className="container mt-7">
      <h2 className="text-center" style={{ marginTop: "5rem" }}>
        Manage Exercises
      </h2>
      <div className="py-4">
        <table className="table table-dark table-hover table border">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Exercise Name</th>
              <th scope="col">Type</th>
              <th scope="col">
                <Link className="btn btn-success" to="/exercises/add">
                  +Exercise
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise, index) => (
              <tr>
                <th scope="row" key={exercise.id}>
                  {exercise.id}
                </th>
                <td>{exercise.name}</td>
                <td>{exercise.type}</td>
                <td>
                  <Link
                    className="btn btn-outline-light mx-3"
                    to={`/exercises/update/${exercise.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-outline-light mx-3"
                    onClick={() => deleteExercise(exercise.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
