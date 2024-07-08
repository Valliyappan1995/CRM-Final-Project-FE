import { createContext, useEffect, useState } from "react";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Dashboard from "./pages/Dashboard";
import Contacts from "./components/Contacts";
import DisplayContacts from "./components/DisplayContacts";
import EditContact from "./components/EditContact";
import Logout from "./components/Logout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotFound from "./pages/NotFound";
import DisplayLeads from "./components/DisplayLeads";
import EditLead from "./components/EditLeads";
import Leads from "./components/Leads";
import DisplayTasks from "./components/DisplayTasks";
import EditTask from "./components/EditTask";
import Tasks from "./components/Tasks";
import Deals from "./components/Deals";
import EditDeal from "./components/EditDeal";
import DisplayDeals from "./components/DisplayDeals";

export const UserContext = createContext(null);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <DisplayContacts />,
      },
      {
        path: "contacts",
        element: <Contacts />,
      },
      {
        path: "edit-contact/:id",
        element: <EditContact />,
      },
      {
        path: "displayLeads",
        element: <DisplayLeads />,
      },
      {
        path: "edit-lead/:id",
        element: <EditLead />,
      },
      {
        path: "leads",
        element: <Leads />,
      },
      {
        path: "displaytasks",
        element: <DisplayTasks />,
      },
      {
        path: "edit-task/:id",
        element: <EditTask />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "displaydeals",
        element: <DisplayDeals />,
      },
      {
        path: "edit-deal/:id",
        element: <EditDeal />,
      },
      {
        path: "deals",
        element: <Deals />,
      },
    ],
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch token from wherever you store it (localStorage, state, etc.)
    const token = localStorage.getItem("token"); // Example: Retrieving from localStorage

    if (token) {
      axios
        .get("http://localhost:3000/bestcrm/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.user);
          } else {
            console.error("Token verification failed:", res.data.message);
          }
        })
        .catch((err) => {
          console.log("Error verifying token:", err);
        });
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
};

export default App;
