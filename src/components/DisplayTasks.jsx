import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { PuffLoader } from "react-spinners";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const customStyles = {
  headCells: {
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

const DisplayTasks = () => {
  const [displayTasks, setDisplayTasks] = useState([]);
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
            `https://crm-backend-final-7.onrender.com/bestcrm/displaytasks/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            setDisplayTasks((prevTasks) =>
              prevTasks.filter((task) => task._id !== id)
            );
            MySwal.fire({
              title: "Deleted!",
              text: "Your task has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            MySwal.fire({
              title: "Error!",
              text: "Error occurred!",
              icon: "error",
            });
          });
      }
    });
  };

  const columns = [
    {
      name: "Task Name",
      selector: (row) => row.taskName,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Priority",
      selector: (row) => row.priority,
    },
    {
      name: "Due Date",
      selector: (row) => {
        const date = new Date(row.dueDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
    },
    {
      name: "Assigned To",
      selector: (row) => row.assignedTo,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link to={`/dashboard/edit-task/${row._id}`}>
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
      .get("https://crm-backend-final-7.onrender.com/bestcrm/displaytasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setDisplayTasks(res.data.displayTasks);
        } else {
          console.log("Error: ", res.data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tasks: ", err);
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
        <div className="task-list">
          <DataTable
            columns={columns}
            data={displayTasks}
            customStyles={customStyles}
            pagination
          />
          {displayTasks && displayTasks.length === 0 && (
            <h2>No tasks available. Add New Task</h2>
          )}
        </div>
      )}
    </>
  );
};

export default DisplayTasks;
