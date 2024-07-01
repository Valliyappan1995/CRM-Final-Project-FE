import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTag, FaList, FaDollarSign, FaBox } from "react-icons/fa6";
import "../assets/css/form.css";

const ProductForm = () => {
  const [values, setValues] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/bestcrm/products", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Product Added Successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          navigate("/dashboard/displayproducts");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Adding Product", {
          position: "top-right",
          autoClose: 5000,
        });
      });
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Add Product</h2>
        <div className="form-group">
          <FaTag />
          <input
            type="text"
            placeholder="Enter Product Name"
            className="form-control"
            name="name"
            onChange={handleInput}
            value={values.name}
          />
        </div>
        <div className="form-group">
          <FaList />
          <input
            type="text"
            placeholder="Enter Category"
            className="form-control"
            name="category"
            onChange={handleInput}
            value={values.category}
          />
        </div>
        <div className="form-group">
          <FaDollarSign />
          <input
            type="number"
            placeholder="Enter Price"
            className="form-control"
            name="price"
            onChange={handleInput}
            value={values.price}
          />
        </div>
        <div className="form-group">
          <FaBox />
          <input
            type="number"
            placeholder="Enter Stock"
            className="form-control"
            name="stock"
            onChange={handleInput}
            value={values.stock}
          />
        </div>
        <button className="form-btn">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
