import React, { useEffect, useState } from "react";
import "../assets/css/form.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaAt,
  FaBlackTie,
  FaLandmark,
  FaPersonCircleCheck,
  FaUserPlus,
} from "react-icons/fa6";

const EditContact = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    department: "",
    employees: "",
    vendor: "",
  });

  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/bestcrm/update-contact/" + id, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Contact Updated Successfully", {
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

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/bestcrm/displaycontacts/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setValues({
            name: res.data.name,
            email: res.data.email,
            department: res.data.department,
            employees: res.data.employees,
            vendor: res.data.vendor,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="add-form-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Edit Contact</h2>
        <div className="form-group">
          <FaUserPlus />
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
          <FaLandmark />
          <input
            type="text"
            placeholder="Enter the Department"
            className="form-control"
            name="department"
            autoComplete="off"
            onChange={handleInput}
            value={values.department}
          />
        </div>
        <div className="form-group">
          <FaPersonCircleCheck />
          <input
            type="text"
            placeholder="Enter Number Of Employees"
            className="form-control"
            name="employees"
            autoComplete="off"
            onChange={handleInput}
            value={values.employees}
          />
        </div>
        <div className="form-group">
          <FaBlackTie />
          <input
            type="text"
            placeholder="Enter Vendor Name"
            className="form-control"
            name="vendor"
            autoComplete="off"
            onChange={handleInput}
            value={values.vendor}
          />
        </div>
        <button className="form-btn">Update</button>
      </form>
    </div>
  );
};

export default EditContact;
