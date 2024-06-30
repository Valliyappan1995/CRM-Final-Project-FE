import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddInteraction = () => {
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const { contactId } = useParams();

  const handleInput = (event) => {
    setNote(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://crm-backend-final-5.onrender.com/bestcrm/interactions",
        { contact: contactId, note },
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
          navigate(`/dashboard/contact-interaction-log/${contactId}`);
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
          <textarea
            placeholder="Enter interaction note"
            className="form-control"
            name="note"
            onChange={handleInput}
          />
        </div>
        <button className="form-btn">Save</button>
      </form>
    </div>
  );
};

export default AddInteraction;
