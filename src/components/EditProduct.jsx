import React, { useEffect, useState } from "react";
import "../assets/css/editproduct.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaBox, FaDollarSign, FaWarehouse, FaTags } from "react-icons/fa6";

const EditProduct = () => {
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
      .put("http://localhost:3000/bestcrm/update-products/" + id, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Product Updated Successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          navigate("/dashboard/displayproducts");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/bestcrm/displayproducts/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setValues({
            name: res.data.name,
            category: res.data.category,
            price: res.data.price,
            stock: res.data.stock,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="edit-form-container">
      <form className="edit-form" onSubmit={handleSubmit}>
        <h2>Edit Product</h2>
        <div className="form-group">
          <FaBox />
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
          <FaTags />
          <input
            type="text"
            placeholder="Enter Category"
            className="form-control"
            name="category"
            autoComplete="off"
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
            autoComplete="off"
            onChange={handleInput}
            value={values.price}
          />
        </div>
        <div className="form-group">
          <FaWarehouse />
          <input
            type="number"
            placeholder="Enter Stock Quantity"
            className="form-control"
            name="stock"
            autoComplete="off"
            onChange={handleInput}
            value={values.stock}
          />
        </div>
        <button className="form-btn">Update</button>
      </form>
    </div>
  );
};

export default EditProduct;
