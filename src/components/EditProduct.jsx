import React, { useEffect, useState } from "react";
import "../assets/css/form.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaProductHunt, FaDollarSign } from "react-icons/fa";

const EditProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://crm-backend-final-5.onrender.com/bestcrm/update-product/${id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          toast.success("Product Updated Successfully", {
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

  useEffect(() => {
    axios
      .get(
        `https://crm-backend-final-5.onrender.com/bestcrm/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setValues({
            name: res.data.name,
            description: res.data.description,
            price: res.data.price,
            quantity: res.data.quantity,
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
        <h2>Edit Product</h2>
        <div className="form-group">
          <FaProductHunt />
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
          <textarea
            placeholder="Enter Product Description"
            className="form-control"
            name="description"
            onChange={handleInput}
            value={values.description}
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
            value={values.price}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Quantity Available"
            className="form-control"
            name="quantity"
            onChange={handleInput}
            value={values.quantity}
          />
        </div>
        <button className="form-btn">Update</button>
      </form>
    </div>
  );
};

export default EditProduct;
