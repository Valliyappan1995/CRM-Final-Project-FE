import React, { useEffect, useState } from "react";
import "../assets/css/form.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaAt,
  FaBuilding,
  FaHandshake,
  FaUserEdit,
  FaUserTie,
} from "react-icons/fa";

const EditLeads = () => {
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
      .put(
        "https://crm-backend-final-7.onrender.com/bestcrm/update-lead/" + id,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          toast.success("Lead Updated Successfully", {
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

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        "https://crm-backend-final-7.onrender.com/bestcrm/displayleads/" + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setValues({
            name: res.data.name,
            email: res.data.email,
            company: res.data.company,
            status: res.data.status,
            assignedTo: res.data.assignedTo,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="add-form-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Edit Lead</h2>
        <div className="form-group">
          <FaUserEdit />
          <input
            type="text"
            placeholder="Enter name"
            className="form-control"
            name="name"
            onChange={handleInput}
            value={values.name}
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
            value={values.email}
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
            value={values.company}
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
            value={values.status}
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
            value={values.assignedTo}
          />
        </div>
        <button className="form-btn">Update</button>
      </form>
    </div>
  );
};

export default EditLeads;
