import React from "react";
import Navbar from "../components/Navbar";
import "../assets/css/home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home">
        <h1 className="home-title">CUSTOMER REALTIONSHIP MANAGEMENT</h1>
        <p className="home-description">
          BEST CRM is a powerful, easy-to-use CRM, and all in one brilliant
          solution to unlock value across Sales, Marketing, and Customer Support
          teams.
        </p>
      </div>
    </>
  );
};

export default Home;
