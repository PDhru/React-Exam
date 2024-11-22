import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../redux/studentSlice.js";

const StudentForm = () => {
  const [student, setStudent] = useState({
    name: "",
    rollNumber: "",
    class: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent(student));
    setStudent({ name: "", rollNumber: "", class: "" });
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-info text-white text-center">
          <h3>Add New Student</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={student.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter student's name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Roll Number</label>
              <input
                type="text"
                name="rollNumber"
                value={student.rollNumber}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter roll number"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Class</label>
              <input
                type="text"
                name="class"
                value={student.class}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter student's class"
                required
              />
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary w-48">
                Add Student
              </button>
              <button
                type="button"
                className="btn btn-secondary w-48"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
