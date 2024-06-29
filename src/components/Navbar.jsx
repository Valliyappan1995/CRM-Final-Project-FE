import React, { useContext } from "react";
import "../assets/css/navbar.css";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          BEST CRM
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-link">
          About
        </Link>
        {user ? (
          <>
            <Link to="/login" className="navbar-link">
              Contact
            </Link>
            <Link to="/dashboard/contacts" className="navbar-link">
              {user.name}
            </Link>
            <Link to="/logout" className="navbar-link">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/register" className="navbar-link">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
