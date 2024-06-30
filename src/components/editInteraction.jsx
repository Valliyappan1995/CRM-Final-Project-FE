import React, { useEffect, useState } from "react";
import "../assets/css/form.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaPeopleArrows, FaCalendarDays, FaUser } from "react-icons/fa6";

const EditInteraction = () => {
  const [values, setValues] = useState({
    contactId: "",
    interactionType: "",
    date: "",
    notes: "",
  });

  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        "https://crm-backend-final-5.onrender.com/bestcrm/update-interaction/" +
          id,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          toast.success("Interaction Updated Successfully", {
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
        "https://crm-backend-final-5.onrender.com/bestcrm/interactions/" + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setValues({
            contactId: res.data.contactId,
            interactionType: res.data.interactionType,
            date: res.data.date,
            notes: res.data.notes,
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
        <h2>Edit Interaction</h2>
        <div className="form-group">
          <FaUser />
          <input
            type="text"
            placeholder="Enter Contact ID"
            className="form-control"
            name="contactId"
            onChange={handleInput}
            value={values.contactId}
          />
        </div>
        <div className="form-group">
          <FaPeopleArrows />
          <input
            type="text"
            placeholder="Enter Interaction Type"
            className="form-control"
            name="interactionType"
            onChange={handleInput}
            value={values.interactionType}
          />
        </div>
        <div className="form-group">
          <FaCalendarDays />
          <input
            type="date"
            className="form-control"
            name="date"
            onChange={handleInput}
            value={values.date}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Enter Notes"
            className="form-control"
            name="notes"
            onChange={handleInput}
            value={values.notes}
          ></textarea>
        </div>
        <button className="form-btn">Update</button>
      </form>
    </div>
  );
};

export default EditInteraction;
