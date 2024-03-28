import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ViewExercises() {
  const [exercises, setExercises] = useState([]);
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    const result = await axios.get(
      "http://localhost:8082/schedule-ms/exercises"
    );
    setExercises(result.data);
    setSearchResults(result.data); // Initially set search results to all exercises
  };

  const deleteExercise = async (id) => {
    // Confirm deletion using window.confirm
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this exercise?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8082/schedule-ms/exercises/${id}`);
        loadExercises();
      } catch (error) {
        console.error("Error deleting exercise:", error);
      }
    }
  };

  const handleSearch = () => {
    const filteredExercises = exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(input.toLowerCase())
    );
    setSearchResults(filteredExercises);
  };

  const handleReset = () => {
    setInput("");
    setSearchResults(exercises);
  };

  return (
    <div className="container mt-7">
      <h2 className="text-center" style={{ marginTop: "5rem" }}>
        Manage Exercises
      </h2>

      <div className="container-fluid d-flex justify-content-end align-items-center">
        <Link to="/exercises/add" className="btn btn-success me-2">
          + Add Exercise
        </Link>
        <div className="dropdown">
          <input
            className="form-control me-2 dropdown-toggle"
            type="search"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Search"
          />
        </div>

        {/* Add a spacer */}
        <div style={{ width: "10px" }} />

        <button
          className="btn btn-outline-success"
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>

        {/* Add reset button */}
        <button
          className="btn btn-outline-secondary ms-2"
          type="button"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <div className="py-4">
        <table className="table table-dark table-hover table border">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Exercise Name</th>
              <th scope="col">Type</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((exercise, index) => (
              <tr key={exercise.id}>
                <th scope="row"></th>
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
                    className="btn btn-light mx-3"
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
