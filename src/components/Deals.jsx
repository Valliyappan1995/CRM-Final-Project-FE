import React, { useEffect, useState } from "react";
import "../assets/css/form.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaMoneyBill, FaHandshake, FaTag, FaUserTie } from "react-icons/fa6";

const Deals = () => {
  const [values, setValues] = useState({
    dealName: "",
    value: "",
    stage: "",
    contact: "",
  });
  const [contacts, setContacts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/bestcrm/displaycontacts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setContacts(res.data.displaycontacts);
        }
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
      });
  }, []);

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/bestcrm/deals", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Deal Added Successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          navigate("/dashboard/displaydeals");
        }
      })
      .catch((err) => {
        console.error("Error adding deal:", err);
        toast.error("Error adding deal. Please try again.", {
          position: "top-right",
          autoClose: 5000,
        });
      });
  };

  return (
    <div className="add-form-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Deal Information</h2>
        <div className="form-group">
          <FaTag />
          <input
            type="text"
            placeholder="Enter Deal Name"
            className="form-control"
            name="dealName"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <FaMoneyBill />
          <input
            type="text"
            placeholder="Enter Value"
            className="form-control"
            name="value"
            autoComplete="off"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <FaHandshake />
          <input
            type="text"
            placeholder="Enter Stage"
            className="form-control"
            name="stage"
            autoComplete="off"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <FaUserTie />
          <select
            className="form-control"
            name="contact"
            onChange={handleInput}
          >
            <option value="">Select Contact</option>
            {contacts.map((contact) => (
              <option key={contact._id} value={contact._id}>
                {contact.name}
              </option>
            ))}
          </select>
        </div>
        <button className="form-btn">Save</button>
      </form>
    </div>
  );
};

export default Deals;
