import React, { useState, useEffect } from "react";
import "../assets/css/form.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaMoneyBill, FaHandshake, FaTag, FaUserTie } from "react-icons/fa6";

const EditDeal = () => {
  const [values, setValues] = useState({
    dealName: "",
    value: "",
    stage: "",
    contact: "",
  });
  const [contacts, setContacts] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://crm-backend-final-6.onrender.com/bestcrm/update-deal/${id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          toast.success("Deal Updated Successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          navigate("/dashboard/displaydeals");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://crm-backend-final-6.onrender.com/bestcrm/displaydeals/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setValues({
            dealName: res.data.dealName,
            value: res.data.value,
            stage: res.data.stage,
            contact: res.data.contact._id,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://crm-backend-final-6.onrender.com/bestcrm/displaycontacts", {
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
        console.log(err);
      });
  }, [id]);

  return (
    <div className="add-form-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Edit Deal</h2>
        <div className="form-group">
          <FaTag />
          <input
            type="text"
            placeholder="Enter Deal Name"
            className="form-control"
            name="dealName"
            onChange={handleInput}
            value={values.dealName}
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
            value={values.value}
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
            value={values.stage}
          />
        </div>
        <div className="form-group">
          <FaUserTie />
          <select
            className="form-control"
            name="contact"
            onChange={handleInput}
            value={values.contact}
          >
            <option value="" disabled>
              Select Associated Contact
            </option>
            {contacts.map((contact) => (
              <option key={contact._id} value={contact._id}>
                {contact.name}
              </option>
            ))}
          </select>
        </div>
        <button className="form-btn">Update</button>
      </form>
    </div>
  );
};

export default EditDeal;
