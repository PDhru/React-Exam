import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, deleteStudent } from "../redux/studentSlice";
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

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Student List</h2>

      {/* Search and Filter Section */}
      <div className="row mb-4">
        {/* Search by Name */}
        <div className="col-md-4">
          <div className="input-group">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
              placeholder="Search by student name"
            />
            <span className="input-group-text bg-info text-white">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>

        {/* Filter by Class */}
        <div className="col-md-4">
          <div className="input-group">
            <input
              type="text"
              value={filterByClass}
              onChange={(e) => setFilterByClass(e.target.value)}
              className="form-control"
              placeholder="Filter by class"
            />
            <span className="input-group-text bg-info text-white">
              <i className="fas fa-filter"></i>
            </span>
          </div>
        </div>

        {/* Sort by Select */}
        <div className="col-md-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select"
          >
            <option value="name">Name</option>
            <option value="rollNumber">Roll Number</option>
          </select>
        </div>
      </div>

      {/* Student Table */}
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
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
                  <i className="fas fa-edit"></i> Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(student.id)}
                >
                  <i className="fas fa-trash-alt"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
