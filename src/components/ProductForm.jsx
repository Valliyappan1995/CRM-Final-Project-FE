import React, { useState } from "react";
import "../assets/css/form.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaProductHunt, FaDollarSign } from "react-icons/fa";

const ProductForm = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://crm-backend-final-5.onrender.com/bestcrm/products",
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          toast.success("Product Added Successfully", {
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
        <h2>Add New Product</h2>
        <div className="form-group">
          <FaProductHunt />
          <input
            type="text"
            placeholder="Enter Product Name"
            className="form-control"
            name="name"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Enter Product Description"
            className="form-control"
            name="description"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <FaDollarSign />
          <input
            type="text"
            placeholder="Enter Price"
            className="form-control"
            name="price"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Quantity Available"
            className="form-control"
            name="quantity"
            onChange={handleInput}
          />
        </div>
        <button className="form-btn">Save</button>
      </form>
    </div>
  );
};

export default ProductForm;
