import React, { useState } from "react";
import "../assets/css/form.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaAt,
  FaBuilding,
  FaHandshake,
  FaUserEdit,
  FaUserTie,
} from "react-icons/fa";

const Leads = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    status: "",
    assignedTo: "",
  });

  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://crm-backend-final-7.onrender.com/bestcrm/leads", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Lead Added Successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          navigate("/dashboard/displayleads");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="add-form-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Lead Information</h2>
        <div className="form-group">
          <FaUserEdit />
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
          <FaBuilding />
          <input
            type="text"
            placeholder="Enter the Company"
            className="form-control"
            name="company"
            autoComplete="off"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <FaHandshake />
          <input
            type="text"
            placeholder="Enter Status"
            className="form-control"
            name="status"
            autoComplete="off"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <FaUserTie />
          <input
            type="text"
            placeholder="Enter Assigned To"
            className="form-control"
            name="assignedTo"
            autoComplete="off"
            onChange={handleInput}
          />
        </div>
        <button className="form-btn">Save</button>
      </form>
    </div>
  );
};

export default Leads;
