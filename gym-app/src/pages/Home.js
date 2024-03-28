import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    const result = await axios.get("http://localhost:8081/member-ms/members");
    const formattedMembers = result.data.map((member) => ({
      ...member,
      jdate: formatDate(member.jdate),
    }));
    setMembers(formattedMembers);
    setSearchResults(formattedMembers);
  };

  const deleteMember = async (id) => {
    await axios.delete(`http://localhost:8081/member-ms/members/${id}`);
    loadMembers();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      // Filter members based on search query
      const filteredMembers = members.filter((member) =>
        member.firstname.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredMembers);
    } else {
      setSearchResults(members);
    }
  };

  const handleSuggestionClick = (member) => {
    setSearchQuery(member.firstname);
    setSearchResults([member]);
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by First Name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <div className="suggestions">
              {searchResults.map((member, index) => (
                <div
                  key={index}
                  className="suggestion"
                  onClick={() => handleSuggestionClick(member)}
                >
                  {member.firstname}
                </div>
              ))}
            </div>
          )}
        </div>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">NIC</th>
              <th scope="col">Gender</th>
              <th scope="col">Age</th>
              <th scope="col">Address</th>
              <th scope="col">Mobile</th>
              <th scope="col">Email</th>
              <th scope="col">Joined Date</th>
              <th scope="col">Trainer ID</th>
              <th scope="col">Trainer Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((member, id) => (
              <tr key={id}>
                <th scope="row">{member.id}</th>
                <td>{member.firstname}</td>
                <td>{member.lastname}</td>
                <td>{member.nic}</td>
                <td>{member.gender}</td>
                <td>{member.age}</td>
                <td>{member.address}</td>
                <td>{member.mobile}</td>
                <td>{member.email}</td>
                <td>{member.jdate}</td>
                <td>{member.tid}</td>
                <td>{member.tname}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/viewmember/${member.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editmember/${member.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteMember(member.id)}
                  >
                    Delete
                  </button>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/createshedule/${member.id}`}
                  >
                    Create
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
