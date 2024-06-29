import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/sidebar.css";
import {
  FaCuttlefish,
  FaUser,
  FaAddressCard,
  FaPowerOff,
  FaAccusoft,
} from "react-icons/fa6";
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
        <Link className="sidebar-link">
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
        <Link to="/displayOffers" className="sidebar-link">
          <FaPowerOff className="icon" /> Display Offers
        </Link>
      </div>
      <div
        className={`sidebar-item ${activeLink === 4 ? " active " : ""}`}
        onClick={() => setActiveLink(4)}
      >
        <Link to="/offers" className="sidebar-link">
          <FaPowerOff className="icon" /> Offers
        </Link>
      </div>
      <div
        className={`sidebar-item ${activeLink === 5 ? " active " : ""}`}
        onClick={() => setActiveLink(5)}
      >
        <Link to="/logout" className="sidebar-link">
          <FaPowerOff className="icon" /> Exit
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
