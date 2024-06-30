import React, { useState, useEffect } from "react";
import "../assets/css/form.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaPeopleArrows, FaCalendarDays, FaUser } from "react-icons/fa6";

const Interactions = () => {
  const [values, setValues] = useState({
    contactId: "",
    interactionType: "",
    date: "",
    notes: "",
  });

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get("https://crm-backend-final-5.onrender.com/bestcrm/contacts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setContacts(res.data.contacts);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://crm-backend-final-5.onrender.com/bestcrm/interactions",
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          toast.success("Interaction Added Successfully", {
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
        <h2>Add Interaction</h2>
        <div className="form-group">
          <FaUser />
          <select
            className="form-control"
            name="contactId"
            onChange={handleInput}
            value={values.contactId}
          >
            <option value="" disabled>
              Select Contact
            </option>
            {contacts.map((contact) => (
              <option key={contact._id} value={contact._id}>
                {contact.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <FaPeopleArrows />
          <input
            type="text"
            placeholder="Enter Interaction Type"
            className="form-control"
            name="interactionType"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <FaCalendarDays />
          <input
            type="date"
            className="form-control"
            name="date"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Enter Notes"
            className="form-control"
            name="notes"
            onChange={handleInput}
          ></textarea>
        </div>
        <button className="form-btn">Save</button>
      </form>
    </div>
  );
};

export default Interactions;
