import React, { useState } from "react";
import "../assets/css/form.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaCalendarAlt, FaUser, FaFlag, FaTasks } from "react-icons/fa";

const Tasks = () => {
  const [values, setValues] = useState({
    taskName: "",
    description: "",
    priority: "",
    dueDate: "",
    assignedTo: "",
  });

  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/bestcrm/tasks", values, {
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
          navigate("/dashboard/displaytasks");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="add-form-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Task Information</h2>
        <div className="form-group">
          <FaTasks />
          <input
            type="text"
            placeholder="Enter Task Name"
            className="form-control"
            name="taskName"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <FaEdit />
          <input
            type="text"
            placeholder="Enter Description"
            className="form-control"
            name="description"
            autoComplete="off"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <FaFlag />
          <input
            type="text"
            placeholder="Enter Priority"
            className="form-control"
            name="priority"
            autoComplete="off"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <FaCalendarAlt />
          <input
            type="date"
            className="form-control"
            name="dueDate"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <FaUser />
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

export default Tasks;
