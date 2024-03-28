import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TrainerHome() {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    loadUsers();
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(
      "http://localhost:8080/gym-trainer/trainers"
    );
    const formattedUsers = result.data.map((user) => ({
      ...user,
      joined_date: formatDate(user.joined_date),
    }));
    setUsers(formattedUsers);
    setSearchResults(formattedUsers); // Initially set search results to all users
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSearch = () => {
    const filteredUsers = users.filter((user) =>
      user.first_name.toLowerCase().startsWith(input.toLowerCase())
    );
    setSearchResults(filteredUsers);
  };

  const handleReset = () => {
    setInput("");
    setSearchResults(users);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
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
            {searchResults.map((user, index) => (
              <button
                key={index}
                className="dropdown-item"
                type="button"
                onClick={() => {
                  setInput(user.first_name);
                  setShowDropdown(false);
                }}
              >
                {user.first_name}
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
            {searchResults.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.gender}</td>
                <td>{user.address}</td>
                <td>{user.mobile}</td>
                <td>{user.email}</td>
                <td>{user.joined_date}</td>
                <td>
                  <button className="btn btn-outline-light">View</button>
                  <button className="btn btn-outline-light mx-2">Edit</button>
                  <button className="btn btn-light">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
