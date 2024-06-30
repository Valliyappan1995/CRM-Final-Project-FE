import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState({
    name: "",
    email: "",
    company: "",
    status: "",
  });

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await axios.get(`/api/leads/${id}`);
        setLead(response.data);
      } catch (error) {
        console.error("Error fetching lead:", error);
      }
    };

    fetchLead();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLead((prevLead) => ({
      ...prevLead,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/leads/${id}`, lead);
      navigate("/dashboard/leads");
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  return (
    <div className="edit-lead">
      <h2>Edit Lead</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={lead.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={lead.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={lead.company}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <input
            type="text"
            name="status"
            value={lead.status}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Lead</button>
      </form>
    </div>
  );
};

export default EditLead;
