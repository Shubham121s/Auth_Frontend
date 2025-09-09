import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";

const ProfileEdit = () => {
  const [formData, setFormData] = useState({ name: "", email: "", course: "" });
  const [studentId, setStudentId] = useState(null);
  const navigate = useNavigate();

  // Load current profile
  const fetchProfile = async () => {
    try {
      const res = await API.get("/students/profile/me");
      setFormData({
        name: res.data.name,
        email: res.data.email,
        course: res.data.course,
      });
      setStudentId(res.data._id);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/students/${studentId}`, formData);
      navigate("/student");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
