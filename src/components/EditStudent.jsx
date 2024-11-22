import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editStudent } from "../redux/studentSlice";

const EditStudent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, loading } = useSelector((state) => state.students);

  // Ensure that the id from useParams matches the type of student.id (both strings or numbers)
  const student = students.find(
    (student) => student.id === id || student.id === Number(id)
  );

  const [name, setName] = useState(student?.name || "");
  const [rollNumber, setRollNumber] = useState(student?.rollNumber || "");
  const [className, setClassName] = useState(student?.class || "");

  // If student not found or data is still loading, show a loading message
  useEffect(() => {
    if (!student && !loading) {
      navigate("/"); // Redirect to home page if student is not found
    }
  }, [student, navigate, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedStudent = { name, rollNumber, class: className };

    dispatch(editStudent({ id, updatedStudent }))
      .unwrap()
      .then(() => {
        navigate("/"); // Redirect after updating
      })
      .catch((error) => {
        console.log("Failed to update student:", error);
      });
  };

  if (loading) return <p>Loading...</p>; // Show loading if data is still being fetched

  if (!student) return <p>Student not found</p>; // Show message if student is not found

  return (
    <div className="container mt-4">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Roll Number</label>
          <input
            type="text"
            className="form-control"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Class</label>
          <input
            type="text"
            className="form-control"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Student
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
