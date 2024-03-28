import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewMember() {
  const [members, setMembers] = useState({
    firstname: "",
    lastname: "",
    nic: "",
    gender: "",
    age: "",
    address: "",
    mobile: "",
    email: "",
    jdate: "",
  });

  const { id } = useParams();
  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    const result = await axios.get(
      `http://localhost:8081/member-ms/members/${id}`
    );
    const formattedJoinedDate = new Date(result.data.jdate)
      .toISOString()
      .split("T")[0];
    setMembers({ ...result.data, jdate: formattedJoinedDate });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 bordder rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Member Details</h2>

          <div className="card">
            <div className="card-header">
              Details of user id :{members.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Firstname:</b> {members.firstname}
                </li>
                <li className="list-group-item">
                  <b>Lastname:</b> {members.lastname}
                </li>
                <li className="list-group-item">
                  <b>NIC:</b> {members.nic}
                </li>
                <li className="list-group-item">
                  <b>Gender:</b> {members.gender}
                </li>
                <li className="list-group-item">
                  <b>Age:</b> {members.age}
                </li>
                <li className="list-group-item">
                  <b>Address:</b> {members.address}
                </li>
                <li className="list-group-item">
                  <b>Mobile:</b> {members.mobile}
                </li>
                <li className="list-group-item">
                  <b>Email:</b> {members.email}
                </li>
                <li className="list-group-item">
                  <b>Joined date:</b> {members.jdate}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/members"}>
            Back to Member
          </Link>
        </div>
      </div>
    </div>
  );
}
