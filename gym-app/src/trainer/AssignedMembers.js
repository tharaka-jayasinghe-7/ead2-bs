import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function AssignedMembers() {
  const [assignedMembers, setAssignedMembers] = useState([]);
  const location = useLocation();
  const { trainerId } = location.state;

  useEffect(() => {
    const fetchAssignedMembers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/member-ms/members?tid=${trainerId}`
        );
        setAssignedMembers(response.data);
      } catch (error) {
        console.error("Error fetching assigned members:", error);
      }
    };

    fetchAssignedMembers();
  }, [trainerId]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4 mb-3">Assigned Members</h2>
          {assignedMembers.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Member ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                </tr>
              </thead>
              <tbody>
                {assignedMembers.map((member) => (
                  <tr key={member.id}>
                    <td>{member.id}</td>
                    <td>{member.firstname}</td>
                    <td>{member.lastname}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No assigned members found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignedMembers;
