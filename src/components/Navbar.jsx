import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Student Management
        </Link>
        <div>
          <Link to="/" className="btn btn-outline-light me-2 bg-warning">
            Student List
          </Link>
          <Link to="/add" className="btn btn-outline-light bg-warning">
            Add Student
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
