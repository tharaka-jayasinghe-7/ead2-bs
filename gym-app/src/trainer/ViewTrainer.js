import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function ViewTrainer() {
  const [trainer, setTrainer] = useState({
    id: "",
    first_name: "",
    last_name: "",
    gender: "",
    address: "",
    mobile: "",
    email: "",
    joined_date: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadTrainer();
  }, []);

  const loadTrainer = async () => {
    const result = await axios.get(
      `http://localhost:8080/gym-trainer/trainers/${id}`
    );
    result.data.joined_date = formatDate(result.data.joined_date);
    setTrainer(result.data);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container mt-5 ">
      <div className="row ">
        <div
          className="col-md-6 offset-md-3 border rounder p-4 mt-2 shadow mt-5 "
          style={{ backgroundColor: "" }}
        >
          <h2 className="text-center m-4 mb-3">Trainer Details</h2>
          <h5 className="text-center mb-4">Trainer ID:{trainer.id}</h5>

          <div className="card">
            <div className="card-header">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>First Name: </b>
                  {trainer.first_name}
                </li>
                <li className="list-group-item">
                  <b>Last Name: </b>
                  {trainer.last_name}
                </li>
                <li className="list-group-item">
                  <b>Gender: </b>
                  {trainer.gender}
                </li>
                <li className="list-group-item">
                  <b>Address: </b>
                  {trainer.address}
                </li>
                <li className="list-group-item">
                  <b>Mobile: </b>
                  {trainer.mobile}
                </li>
                <li className="list-group-item">
                  <b>Email: </b>
                  {trainer.email}
                </li>
                <li className="list-group-item">
                  <b>Joined Date: </b>
                  {trainer.joined_date}
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <Link
              className="btn btn-success my-1"
              to={"/trainers/viewTrainer/assignedMembers"}
              state={{ trainerId: trainer.id }}
            >
              Assigned Members
            </Link>
            <Link className="btn btn-primary my-2" to={"/trainers"}>
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
