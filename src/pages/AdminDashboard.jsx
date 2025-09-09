import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", course: "" });
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5; // students per page

  // Fetch students (paginated)
  const fetchStudents = async () => {
    try {
      const res = await API.get(`/students?page=${page}&limit=${limit}`);
      setStudents(res.data.students);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new student
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await API.post("/students", formData);
      setFormData({ name: "", email: "", course: "" });
      fetchStudents();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Update student
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/students/${editingId}`, formData);
      setEditingId(null);
      setFormData({ name: "", email: "", course: "" });
      fetchStudents();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await API.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Pagination
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      {/* Add / Edit Student Form */}
      <form
        onSubmit={editingId ? handleUpdate : handleAdd}
        className="bg-white p-4 rounded-xl shadow-md mb-6 w-96"
      >
        <h3 className="text-xl font-semibold mb-3">
          {editingId ? "Edit Student" : "Add Student"}
        </h3>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />

        <button
          type="submit"
          className={`w-full p-2 rounded text-white ${
            editingId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {editingId ? "Update Student" : "Add Student"}
        </button>
      </form>

      {/* Student List */}
      <table className="w-full border-collapse bg-white rounded-xl shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Course</th>
            <th className="border p-2">Enrollment Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.email}</td>
              <td className="border p-2">{s.course}</td>
              <td className="border p-2">
                {new Date(s.enrollmentDate).toLocaleDateString()}
              </td>
              <td className="border p-2 flex gap-2">
                <button
                  className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                  onClick={() => {
                    setEditingId(s._id);
                    setFormData({ name: s.name, email: s.email, course: s.course });
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(s._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
