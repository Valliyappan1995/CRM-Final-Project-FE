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

const DisplayContacts = () => {
  const [displaycontacts, setDisplayContacts] = useState([]);
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
            `https://crm-backend-final-5.onrender.com/bestcrm/displaycontacts/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            setDisplayContacts(res.data.displayContacts);
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
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Department",
      selector: (row) => row.department,
    },
    {
      name: "Employees",
      selector: (row) => row.employees,
    },
    {
      name: "Vendor",
      selector: (row) => row.vendor,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <Link to={`/dashboard/edit-contact/${row._id}`}>
            <FaPenToSquare className="table-icon1" />
          </Link>
          <FaRegTrashCan
            className="table-icon2"
            onClick={() => deleteRecord(row._id)}
          />

          <Link to={`/dashboard/contact-interaction-log/${row._id}`}>
            <button>View Interactions</button>
          </Link>
        </>
      ),
    },
  ];
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://crm-backend-final-5.onrender.com/bestcrm/displaycontacts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setDisplayContacts(res.data.displaycontacts);
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
        <div className="contact-list">
          <DataTable
            columns={columns}
            data={displaycontacts}
            customStyles={customStyles}
            pagination
          />
          {displaycontacts && displaycontacts.length === 0 ? (
            <h2>Add New Contact</h2>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default DisplayContacts;
