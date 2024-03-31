import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function TrainerHome() {
  const [trainers, setTrainers] = useState([]);
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { id } = useParams();

  useEffect(() => {
    loadTrainers();
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const loadTrainers = async () => {
    const result = await axios.get(
      "http://localhost:8080/gym-trainer/trainers"
    );
    const formattedTrainers = result.data.map((trainer) => ({
      ...trainer,
      joined_date: formatDate(trainer.joined_date),
    }));
    setTrainers(formattedTrainers);
    setSearchResults(formattedTrainers); // Initially set search results to all users
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSearch = () => {
    const filteredTrainers = trainers.filter((trainer) =>
      trainer.first_name.toLowerCase().startsWith(input.toLowerCase())
    );
    setSearchResults(filteredTrainers);
  };

  const handleReset = () => {
    setInput("");
    setSearchResults(trainers);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const deleteTrainer = async (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this trainer?"
    );
    if (confirmation) {
      await axios.delete(`http://localhost:8080/gym-trainer/trainers/${id}`);
      loadTrainers();
    }
  };

  return (
    <div className="container mt-7 ">
      <h2 className="text-center" style={{ marginTop: "5rem" }}>
        Manage Trainers
      </h2>
      <div className="container-fluid d-flex justify-content-end align-items-center">
        <Link to="/addTrainer" className="btn btn-success me-2">
          + Add Trainer
        </Link>

        <div className="dropdown" ref={dropdownRef}>
          <input
            className="form-control me-2 dropdown-toggle"
            type="search"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Search"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          />

          <div
            className={`dropdown-menu ${showDropdown ? "show" : ""}`}
            aria-labelledby="dropdownMenuButton"
          >
            {searchResults.map((trainer, index) => (
              <button
                key={index}
                className="dropdown-item"
                type="button"
                onClick={() => {
                  setInput(trainer.first_name);
                  setShowDropdown(false);
                }}
              >
                {trainer.first_name}
              </button>
            ))}
          </div>
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
        <table className="table table-dark border shadow mt-1">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Address</th>
              <th scope="col">Mobile</th>
              <th scope="col">Email</th>
              <th scope="col">Joined Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((trainer, index) => (
              <tr key={index}>
                <td>{trainer.id}</td>
                <td>{trainer.first_name}</td>
                <td>{trainer.last_name}</td>
                <td>{trainer.gender}</td>
                <td>{trainer.address}</td>
                <td>{trainer.mobile}</td>
                <td>{trainer.email}</td>
                <td>{trainer.joined_date}</td>
                <td>
                  <Link
                    className="btn btn-light"
                    to={`/trainers/viewTrainer/${trainer.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-light mx-2"
                    to={`/edittrainer/${trainer.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-outline-light"
                    onClick={() => deleteTrainer(trainer.id)}
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
