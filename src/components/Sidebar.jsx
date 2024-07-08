import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/sidebar.css";
import {
  FaCuttlefish,
  FaUser,
  FaAddressCard,
  FaPowerOff,
  FaAccusoft,
  FaBoxOpen,
} from "react-icons/fa";

export const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(1);

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <FaCuttlefish className="top-icon" />
      </div>
      <div
        className={`sidebar-item ${activeLink === 0 ? " active " : ""}`}
        onClick={() => setActiveLink(0)}
      >
        <Link to="/"className="sidebar-link">
          <FaUser className="icon" />
          Profile
        </Link>
      </div>
      <div
        className={`sidebar-item ${activeLink === 1 ? " active " : ""}`}
        onClick={() => setActiveLink(1)}
      >
        <Link to="/dashboard" className="sidebar-link">
          <FaAccusoft className="icon" />
          Display Contacts
        </Link>
      </div>
      <div
        className={`sidebar-item ${activeLink === 2 ? " active " : ""}`}
        onClick={() => setActiveLink(2)}
      >
        <Link to="/dashboard/contacts" className="sidebar-link">
          <FaAddressCard className="icon" /> Contacts
        </Link>
      </div>
      <div
        className={`sidebar-item ${activeLink === 3 ? " active " : ""}`}
        onClick={() => setActiveLink(3)}
      >
        <Link to="/dashboard/displayleads" className="sidebar-link">
          <FaAccusoft className="icon" />
          Display Leads
        </Link>
      </div>
      <div
        className={`sidebar-item ${activeLink === 4 ? " active " : ""}`}
        onClick={() => setActiveLink(4)}
      >
        <Link to="/dashboard/leads" className="sidebar-link">
          <FaBoxOpen className="icon" /> Leads
        </Link>
      </div>
      <div
        className={`sidebar-item ${activeLink === 5 ? " active " : ""}`}
        onClick={() => setActiveLink(5)}
      >
        <Link to="/dashboard/displaytasks" className="sidebar-link">
          <FaAccusoft className="icon" />
          Display Tasks
        </Link>
      </div>
      <div
        className={`sidebar-item ${activeLink === 6 ? " active " : ""}`}
        onClick={() => setActiveLink(6)}
      >
        <Link to="/dashboard/tasks" className="sidebar-link">
          <FaBoxOpen className="icon" /> Tasks
        </Link>
      </div>
      <div
        className={`sidebar-item ${activeLink === 7 ? " active " : ""}`}
        onClick={() => setActiveLink(7)}
      >
        <Link to="/dashboard/displaydeals" className="sidebar-link">
          <FaAccusoft className="icon" />
          Display Deals
        </Link>
      </div>
      <div
        className={`sidebar-item ${activeLink === 8 ? " active " : ""}`}
        onClick={() => setActiveLink(8)}
      >
        <Link to="/dashboard/deals" className="sidebar-link">
          <FaBoxOpen className="icon" /> Deals
        </Link>
      </div>
      <div
        className={`sidebar-item ${activeLink === 9 ? " active " : ""}`}
        onClick={() => setActiveLink(9)}
      >
        <Link to="/logout" className="sidebar-link">
          <FaPowerOff className="icon" /> Exit
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
