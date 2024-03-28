import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

export default function EditTrainer() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [trainer, setTrainer] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    address: "",
    mobile: "",
    email: "",
    joined_date: "",
  });

  const { first_name, last_name, gender, address, mobile, email, joined_date } =
    trainer;

  const onInputChange = (e) => {
    setTrainer({ ...trainer, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadTrainer();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:8080/gym-trainer/trainers/${id}`,
      trainer
    );

    navigate("/");
  };

  const loadTrainer = async () => {
    const result = await axios.get(
      `http://localhost:8080/gym-trainer/trainers/${id}`
    );

    const date = new Date(result.data.joined_date);
    date.setDate(date.getDate());

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedJoinedDate = `${year}-${month}-${day}`;

    setTrainer({ ...result.data, joined_date: formattedJoinedDate });
  };

  return (
    <div className="container mt-5 ">
      <div className="row ">
        <div
          className="col-md-6 offset-md-3 border rounder p-4 mt-2 shadow mt-5 "
          style={{ backgroundColor: "" }}
        >
          <h2 className="text-center m-4 mb-5">Update Trainer</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-4">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter First Name"
                name="first_name"
                value={first_name}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
                name="last_name"
                value={last_name}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <div className="row">
                <div className="col-auto">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="male"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => onInputChange(e)}
                    />
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="female"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => onInputChange(e)}
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Address"
                name="address"
                value={address}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="mobile" className="form-label">
                Mobile
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Mobile"
                name="mobile"
                value={mobile}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="joined_date" className="form-label">
                Joined Date
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Joined Date"
                name="joined_date"
                value={joined_date}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary ">
                Submit
              </button>

              <button type="reset" className="btn btn-outline-danger mx-2">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
