import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TrainerHome() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(
      "http://localhost:8080/gym-trainer/trainers"
    );
    // Map over the data and format the date
    const formattedUsers = result.data.map((user) => ({
      ...user,
      joined_date: formatDate(user.joined_date),
    }));
    setUsers(formattedUsers);
  };

  // Function to format the date as yyyy-mm-dd
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container mt-5">
      <div className="py-4">
        <table className="table border shadow mt-5">
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
            {users.map((user, index) => (
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
                  <button className="btn btn-primary">View</button>
                  <button className="btn btn-outline-primary mx-2">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
