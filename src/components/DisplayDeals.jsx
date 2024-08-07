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
      fontSize: "15px",
      fontWeight: 600,
    },
  },
  cells: {
    style: {
      fontSize: "13px",
      fontWeight: 500,
    },
  },
};

const MySwal = withReactContent(Swal);

const DisplayDeals = () => {
  const [displayDeals, setDisplayDeals] = useState([]);
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
          .delete(
            `https://crm-backend-final-7.onrender.com/bestcrm/displaydeals/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            setDisplayDeals(res.data.deals);
            MySwal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
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
      name: "Deal Name",
      selector: (row) => row.dealName,
    },
    {
      name: "Value",
      selector: (row) => row.value,
    },
    {
      name: "Stage",
      selector: (row) => row.stage,
    },
    {
      name: "Contact",
      selector: (row) => row.contact?.name || "N/A",
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <Link to={`/dashboard/edit-deal/${row._id}`}>
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
      .get("https://crm-backend-final-7.onrender.com/bestcrm/displaydeals", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setDisplayDeals(res.data.deals);
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
        <div className="deal-list">
          <DataTable
            columns={columns}
            data={displayDeals}
            customStyles={customStyles}
            pagination
          />
          {displayDeals && displayDeals.length === 0 ? (
            <h2>Add New Deal</h2>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default DisplayDeals;
