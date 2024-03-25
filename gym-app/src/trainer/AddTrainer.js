import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTrainer() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    address: "",
    mobile: "",
    email: "",
    joined_date: "",
  });

  const { first_name, last_name, gender, address, mobile, email, joined_date } =
    user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/gym-trainer/trainers", user);
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounder p-4 mt-2 shadow mt-5">
          <h2 className="text-center m-4">Register Trainer</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
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

            <div className="mb-3">
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

            <div className="mb-3">
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
                      onChange={(e) => onInputChange(e)}
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-3">
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

            <div className="mb-3">
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

            <div className="mb-3">
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

            <div className="mb-3">
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

            <button type="submit" className="btn btn-primary">
              Submit
            </button>

            <button type="reset" className="btn btn-outline-danger mx-2">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
