import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaPen, FaRegTrashCan } from "react-icons/fa6";
import { PuffLoader } from "react-spinners";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const DisplayProducts = () => {
  const [displayProducts, setDisplayProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const deleteProduct = (id) => {
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
          .delete(
            `https://crm-backend-final-5.onrender.com/bestcrm/displayproducts/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            setDisplayProducts(res.data.displayProducts);
            MySwal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            MySwal.fire({
              title: "Error!",
              text: "Error Occured!!!",
              icon: "error",
            });
          });
      }
    });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link to={`/dashboard/edit-product/${row._id}`}>
            <FaPen className="table-icon1" />
          </Link>
          <FaRegTrashCan
            className="table-icon2"
            onClick={() => deleteProduct(row._id)}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://crm-backend-final-5.onrender.com/bestcrm/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setDisplayProducts(res.data.products);
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
          <DataTable columns={columns} data={displayProducts} pagination />
          {displayProducts && displayProducts.length === 0 && (
            <h2>Add New Product</h2>
          )}
        </div>
      )}
    </>
  );
};

export default DisplayProducts;
