import React, { useState } from "react";
import "../assets/css/form.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaAt,
  FaBlackTie,
  FaLandmark,
  FaPersonCircleCheck,
  FaUserPlus,
} from "react-icons/fa6";

const Contacts = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    department: "",
    phoneNumber: "",
    address: "",
  });

  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/bestcrm/contacts", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Contact Added Successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="add-form-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Contact Information</h2>
        <div className="form-group">
          <FaUserPlus />
          <input
            type="text"
            placeholder="Enter name"
            className="form-control"
            name="name"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <FaAt />
          <input
            type="email"
            placeholder="Enter Email"
            className="form-control"
            name="email"
            autoComplete="off"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <FaLandmark />
          <input
            type="text"
            placeholder="Enter the Department"
            className="form-control"
            name="department"
            autoComplete="off"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <FaPersonCircleCheck />
          <input
            type="text"
            placeholder="Enter Phone Number"
            className="form-control"
            name="phoneNumber"
            autoComplete="off"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <FaBlackTie />
          <input
            type="text"
            placeholder="Enter Address"
            className="form-control"
            name="address"
            autoComplete="off"
            onChange={handleInput}
          />
        </div>
        <button className="form-btn">Save</button>
      </form>
    </div>
  );
};

export default Contacts;
