import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { PuffLoader } from "react-spinners";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const customStyles = {
  headcells: {
    style: {
      fontSize: 15 + "px",
      fontweight: 600,
    },
  },
  cells: {
    style: {
      fontSize: 13 + "px",
      fontweight: 500,
    },
  },
};

const MySwal = withReactContent(Swal);

const DisplayProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const deleteRecord = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/bestcrm/displayproducts/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setProducts(res.data.products);
            MySwal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            MySwal.fire({
              title: "Error!",
              text: "Error Occurred!!!",
              icon: "error",
            });
          });
      }
    });
  };

  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.name,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <Link to={`/dashboard/edit-product/${row._id}`}>
            <FaPenToSquare className="table-icon1" />
          </Link>
          <FaRegTrashCan
            className="table-icon2"
            onClick={() => deleteRecord(row._id)}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/bestcrm/displayproducts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.products);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader">
          <PuffLoader
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="product-list">
          <DataTable
            columns={columns}
            data={products}
            customStyles={customStyles}
            pagination
          />
          {products && products.length === 0 ? (
            <h2>Add New Product</h2>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default DisplayProducts;
