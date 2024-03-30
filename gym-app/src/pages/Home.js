import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    loadMembers();
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
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
    setShowDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleSearch = () => {
    // Functionality for search button
    const filteredMembers = members.filter((member) =>
      member.firstname.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    setSearchResults(filteredMembers);
  };

  const deleteMember = async (id) => {
    // Functionality for deleting a member
    const confirmation = window.confirm(
      "Are you sure you want to delete this member?"
    );
    if (confirmation) {
      await axios.delete(`http://localhost:8081/member-ms/members/${id}`);
      loadMembers(); // Reload members after deletion
    }
  };

  return (
    <div className="container mt-7">
      <h2 className="text-center" style={{ margin: "5rem" }}>
        Manage Members
      </h2>
      <div className="container-fluid d-flex justify-content-end align-items-center">
        <Link to="/addmember" className="btn btn-success me-2">
          + Add Member
        </Link>
        <div className="dropdown" ref={dropdownRef}>
          <input
            className="form-control me-2 dropdown-toggle"
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            onClick={() => setShowDropdown(true)}
          />
          {showDropdown && searchQuery && (
            <div
              className="dropdown-menu show"
              aria-labelledby="dropdownMenuButton"
            >
              {searchResults.map((member, index) => (
                <button
                  key={index}
                  className="dropdown-item"
                  type="button"
                  onClick={() => handleSuggestionClick(member)}
                >
                  {member.firstname}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Add spacer */}
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
          onClick={loadMembers}
        >
          Reset
        </button>
      </div>
      <div className="py-4">
        <table className="table table-dark border shadow">
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
                    className="btn btn-outline-light mx-3"
                    to={`/viewmember/${member.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-light mx-3"
                    to={`/editmember/${member.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-light"
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
