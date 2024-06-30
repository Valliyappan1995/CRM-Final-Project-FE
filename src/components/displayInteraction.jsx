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

const DisplayInteractions = () => {
  const [displayInteractions, setDisplayInteractions] = useState([]);
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
            `https://crm-backend-final-5.onrender.com/bestcrm/interactions/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            setDisplayInteractions(res.data.displayInteractions);
            MySwal.fire({
              title: "Deleted!",
              text: "Your interaction has been deleted.",
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
      name: "Contact ID",
      selector: (row) => row.contactId,
    },
    {
      name: "Interaction Type",
      selector: (row) => row.interactionType,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Notes",
      selector: (row) => row.notes,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <Link to={`/dashboard/edit-interaction/${row._id}`}>
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
      .get("https://crm-backend-final-5.onrender.com/bestcrm/interactions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setDisplayInteractions(res.data.displayInteractions);
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
        <div className="interaction-list">
          <DataTable
            columns={columns}
            data={displayInteractions}
            customStyles={customStyles}
            pagination
          />
          {displayInteractions && displayInteractions.length === 0 ? (
            <h2>Add New Interaction</h2>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default DisplayInteractions;
