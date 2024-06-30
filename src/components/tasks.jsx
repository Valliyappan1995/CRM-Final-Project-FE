import React, { useState, useEffect } from "react";
import "../assets/css/form.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRegHourglassHalf, FaCalendarDays } from "react-icons/fa6";

const Tasks = () => {
  const [values, setValues] = useState({
    taskName: "",
    dueDate: "",
  });

  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://crm-backend-final-5.onrender.com/bestcrm/tasks", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Task Added Successfully", {
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
        <h2>Add Task</h2>
        <div className="form-group">
          <FaRegHourglassHalf />
          <input
            type="text"
            placeholder="Enter Task Name"
            className="form-control"
            name="taskName"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <FaCalendarDays />
          <input
            type="date"
            className="form-control"
            name="dueDate"
            onChange={handleInput}
          />
        </div>
        <button className="form-btn">Save</button>
      </form>
    </div>
  );
};

export default Tasks;
