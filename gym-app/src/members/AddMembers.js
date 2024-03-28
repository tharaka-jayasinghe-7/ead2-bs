import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddMember() {
  let navigate = useNavigate();
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
    tid: "",
    tname: "",
  });

  const {
    firstname,
    lastname,
    nic,
    gender,
    age,
    address,
    mobile,
    email,
    jdate,
    tid,
    tname,
  } = members;

  const onInputChange = (e) => {
    setMembers({ ...members, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8081/member-ms/members", members);
    navigate("/");
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 bordder rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register Member</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="FirstName" className="form-label">
                First name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Your First name"
                name="firstname"
                value={firstname}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="LastName" className="form-label">
                Last name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Your Last name"
                name="lastname"
                value={lastname}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="NIC" className="form-label">
                NIC
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Your NIC"
                name="nic"
                value={nic}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => onInputChange(e)}
                  className="form-check-input"
                />
                <label htmlFor="male" className="form-check-label">
                  Male
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => onInputChange(e)}
                  className="form-check-input"
                />
                <label htmlFor="female" className="form-check-label">
                  Female
                </label>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="Age" className="form-label">
                Age
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Your Age"
                name="age"
                value={age}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Address" className="form-label">
                Address
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Your Address"
                name="address"
                value={address}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Mobile" className="form-label">
                Mobile
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Your Mobile Number"
                name="mobile"
                value={mobile}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Your Email Address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Joined Date" className="form-label">
                Joined Date
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Your Joined date"
                name="jdate"
                value={jdate}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Trainer ID" className="form-label">
                Trainer ID
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Trainer ID"
                name="tid"
                value={tid}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Trainer Name" className="form-label">
                Trainer Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Trainer Name"
                name="tname"
                value={tname}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancle
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
