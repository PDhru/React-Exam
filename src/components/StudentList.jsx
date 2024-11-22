import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../redux/student";
import { Link } from "react-router-dom";

const StudentList = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);

  const [search, setSearch] = useState("");
  const [filterByClass, setFilterByClass] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);


  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return a.rollNumber - b.rollNumber;
    }
  });


  const filteredStudents = sortedStudents.filter((student) => {
    return (
      student.name.toLowerCase().includes(search.toLowerCase()) &&
      student.class.toLowerCase().includes(filterByClass.toLowerCase())
    );
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4 bg-secondary">
      <h2>Student List</h2>


      <div className="mb-3 bg-info">
        <label>Search by Name:</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
          placeholder="Search by student name"
        />
      </div>


      <div className="mb-3">
        <label>Filter by Class:</label>
        <input
          type="text"
          value={filterByClass}
          onChange={(e) => setFilterByClass(e.target.value)}
          className="form-control"
          placeholder="Enter class to filter"
        />
      </div>


      <div className="mb-3">
        <label>Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="form-control"
        >
          <option value="name">Name</option>
          <option value="rollNumber">Roll Number</option>
        </select>
      </div>


      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.rollNumber}</td>
              <td>{student.class}</td>
              <td>
                <Link
                  to={`/edit/${student.id}`}
                  className="btn btn-info btn-sm me-2"
                >
                  Edit
                </Link>
                <button className="btn btn-warning btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
