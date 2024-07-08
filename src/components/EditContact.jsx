import React, { useEffect, useState } from "react";
import "../assets/css/form.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaAt,
  FaBlackTie,
  FaLandmark,
  FaPhoneAlt,
  FaUserPlus,
} from "react-icons/fa";

const EditContact = () => {
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
      .put(
        "https://crm-backend-final-7.onrender.com/bestcrm/update-contact/" + id,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
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
      .get(
        "https://crm-backend-final-7.onrender.com/bestcrm/displaycontacts/" +
          id,
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
            department: res.data.department,
            phoneNumber: res.data.phoneNumber,
            address: res.data.address,
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
          <FaPhoneAlt />
          <input
            type="text"
            placeholder="Enter Phone Number"
            className="form-control"
            name="phoneNumber"
            autoComplete="off"
            onChange={handleInput}
            value={values.phoneNumber}
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
            value={values.address}
          />
        </div>
        <button className="form-btn">Update</button>
      </form>
    </div>
  );
};

export default EditContact;
