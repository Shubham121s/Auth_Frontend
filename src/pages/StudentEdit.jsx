// src/pages/StudentEdit.jsx
import React, { useState, useEffect } from "react";
import API from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const StudentEdit = () => {
  const [formData, setFormData] = useState({ name: "", email: "", course: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch current profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/students/profile/me");
        setFormData({
          name: res.data.name,
          email: res.data.email,
          course: res.data.course,
        });
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await API.put("/students/me", formData); // backend update route
      navigate("/student"); // go back to dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-md w-96">
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
        <input type="text" name="course" value={formData.course} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default StudentEdit;
