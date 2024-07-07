import React, { useEffect, useState } from "react";
import "../assets/css/form.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaCalendarAlt, FaUser, FaFlag, FaTasks } from "react-icons/fa";

const EditTask = () => {
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
      .put("http://localhost:3000/bestcrm/update-task/" + id, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Task Updated Successfully", {
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

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/bestcrm/displaytasks/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setValues({
            taskName: res.data.taskName,
            description: res.data.description,
            priority: res.data.priority,
            dueDate: res.data.dueDate,
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
        <h2>Edit Task</h2>
        <div className="form-group">
          <FaTasks />
          <input
            type="text"
            placeholder="Enter Task Name"
            className="form-control"
            name="taskName"
            onChange={handleInput}
            value={values.taskName}
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
            value={values.description}
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
            value={values.priority}
          />
        </div>
        <div className="form-group">
          <FaCalendarAlt />
          <input
            type="date"
            className="form-control"
            name="dueDate"
            onChange={handleInput}
            value={values.dueDate}
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
            value={values.assignedTo}
          />
        </div>
        <button className="form-btn">Update</button>
      </form>
    </div>
  );
};

export default EditTask;
