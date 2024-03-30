import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddTrainer() {
  let navigate = useNavigate();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [trainer, setTrainer] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    address: "",
    mobile: "",
    email: "",
    joined_date: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Perform validation based on input name
    switch (name) {
      case "first_name":
      case "last_name":
        // Only allow alphabets and spaces
        newValue = value.replace(/[^A-Za-z\s]/g, "");
        break;
      case "mobile":
        // Only allow numeric values
        newValue = value.replace(/\D/g, "");
        break;
      case "joined_date":
        // Validate date format (YYYY-MM-DD)
        newValue = value.replace(/[^0-9\-]/g, "");
        break;
      default:
        // No specific validation for other fields
        break;
    }

    setTrainer({ ...trainer, [name]: newValue });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    navigate("/trainers");

    const {
      first_name,
      last_name,
      gender,
      address,
      mobile,
      email,
      joined_date,
    } = trainer;

    // Basic validation for required fields
    if (
      !first_name ||
      !last_name ||
      !gender ||
      !mobile ||
      !email ||
      !joined_date
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    // Validation for gender selection
    if (gender !== "male" && gender !== "female") {
      alert("Please select a gender.");
      return;
    }

    // Validation for mobile number
    if (!/^\d+$/.test(mobile) || mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Validation for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validation for joined date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(joined_date)) {
      alert("Please enter the joined date in the format YYYY-MM-DD.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/gym-trainer/trainers", trainer);
      navigate("/");
    } catch (error) {
      console.error("Error submitting trainer data:", error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4 mb-5">Register Trainer</h2>

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
                value={trainer.first_name}
                onChange={(e) => onInputChange(e)}
                required
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
                value={trainer.last_name}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Gender</label>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="male"
                  name="gender"
                  value="male"
                  checked={trainer.gender === "male"}
                  onChange={(e) => onInputChange(e)}
                  required
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="female"
                  name="gender"
                  value="female"
                  checked={trainer.gender === "female"}
                  onChange={(e) => onInputChange(e)}
                  required
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
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
                value={trainer.address}
                onChange={(e) => onInputChange(e)}
                required
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
                value={trainer.mobile}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                name="email"
                value={trainer.email}
                onChange={(e) => onInputChange(e)}
                required
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
                value={trainer.joined_date}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>

              <Link
                type="reset"
                className="btn btn-outline-danger mx-2"
                to={"/trainers"}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
