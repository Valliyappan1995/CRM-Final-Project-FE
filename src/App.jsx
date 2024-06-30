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
import AddInteraction from "./components/AddInteraction";
import InteractionLog from "./components/interactionlog";

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
        path: "/dashboard/contacts",
        element: <Contacts />,
      },
      {
        path: "/dashboard/edit-contact/:id",
        element: <EditContact />,
      },
      {
        path: "/dashboard/contact-interaction-log/:contactId",
        element: <InteractionLog />,
      },
      {
        path: "/dashboard/add-interaction/:contactId",
        element: <AddInteraction />,
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
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .get("https://crm-backend-final-5.onrender.com/bestcrm/verify", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
