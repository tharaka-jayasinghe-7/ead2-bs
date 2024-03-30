import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditMember() {
  let navigate = useNavigate();
  const { id } = useParams();
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
    tid: "", // Add tid for trainer ID
    tname: "", // Add tname for trainer name
  });
  const [trainerNames, setTrainerNames] = useState([]);
  const [errors, setErrors] = useState({});

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

  const validateInputs = () => {
    const errors = {};
    if (!firstname.trim()) {
      errors.firstname = "First name is required";
    } else if (!/^[a-zA-Z]+$/.test(firstname.trim())) {
      errors.firstname = "First name should contain only letters";
    }
    if (!lastname.trim()) {
      errors.lastname = "Last name is required";
    } else if (!/^[a-zA-Z]+$/.test(lastname.trim())) {
      errors.lastname = "Last name should contain only letters";
    }
    if (!age.toString().trim()) {
      errors.age = "Age is required";
    } else if (!/^\d+$/.test(age.toString().trim())) {
      errors.age = "Age should contain only numbers";
    }
    if (!mobile.toString().trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile.toString().trim())) {
      errors.mobile = "Mobile number should be 10 digits";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      errors.email = "Email address is invalid";
    }
    if (!jdate.trim()) {
      errors.jdate = "Joined date is required";
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(jdate.trim())) {
      errors.jdate = "Joined date should be in YYYY-MM-DD format";
    }
    if (!tid.trim()) {
      errors.tid = "Trainer ID is required";
    }
    if (!tname.trim()) {
      errors.tname = "Trainer name is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstname" || name === "lastname") {
      // Restrict input to letters only
      setMembers({ ...members, [name]: value.replace(/[^a-zA-Z]/g, "") });
    } else if (name === "age") {
      // Restrict input to numbers only
      setMembers({ ...members, [name]: value.replace(/\D/g, "") });
    } else if (name === "tid") {
      // When selecting a new trainer, update tname based on the selected tid
      const [selectedTid, selectedTname] = value.split(",");
      setMembers({ ...members, [name]: selectedTid, tname: selectedTname });
    } else {
      setMembers({ ...members, [name]: value });
    }
  };

  useEffect(() => {
    loadMembers();
    fetchTrainerNames();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        await axios.put(`http://localhost:8081/member-ms/members/${id}`, {
          ...members,
        });
        navigate("/members");
      } catch (error) {
        console.error("Error updating member:", error);
      }
    }
  };

  const loadMembers = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8081/member-ms/members/${id}`
      );
      const formattedJoinedDate = new Date(result.data.jdate)
        .toISOString()
        .split("T")[0];
      setMembers({
        ...result.data,
        jdate: formattedJoinedDate,
        tname: `${result.data.tid},${result.data.tname}`, // Set tname initially
      });
    } catch (error) {
      console.error("Error loading member:", error);
    }
  };

  const fetchTrainerNames = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/gym-trainer/trainers"
      );
      setTrainerNames(response.data);
    } catch (error) {
      console.error("Error fetching trainer names:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Member</h2>

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
              {errors.firstname && (
                <div className="alert alert-danger">{errors.firstname}</div>
              )}
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
              {errors.lastname && (
                <div className="alert alert-danger">{errors.lastname}</div>
              )}
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
              {errors.nic && (
                <div className="alert alert-danger">{errors.nic}</div>
              )}
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
              {errors.age && (
                <div className="alert alert-danger">{errors.age}</div>
              )}
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
              {errors.mobile && (
                <div className="alert alert-danger">{errors.mobile}</div>
              )}
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
              {errors.email && (
                <div className="alert alert-danger">{errors.email}</div>
              )}
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
              {errors.jdate && (
                <div className="alert alert-danger">{errors.jdate}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="TrainerName" className="form-label">
                Trainer Name
              </label>
              <select
                className="form-select"
                name="tid"
                value={tid}
                onChange={(e) => onInputChange(e)}
              >
                {trainerNames.map((trainer) => (
                  <option
                    key={trainer.id}
                    value={`${trainer.id},${trainer.first_name} ${trainer.last_name}`}
                  >
                    {trainer.first_name} {trainer.last_name}
                  </option>
                ))}
              </select>
              {errors.tid && (
                <div className="alert alert-danger">{errors.tid}</div>
              )}
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/members">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
