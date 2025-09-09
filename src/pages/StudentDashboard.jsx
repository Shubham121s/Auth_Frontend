// import React, { useEffect, useState } from "react";
// import API from "../api/axiosConfig";
// import { Link } from "react-router-dom";

// const StudentDashboard = () => {
//   const [student, setStudent] = useState(null);

//   // Fetch own profile
//   const fetchProfile = async () => {
//     try {
//       const res = await API.get("/students/profile/me");
//       setStudent(res.data);
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   if (!student) return <p className="p-6">Loading profile...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6">Student Dashboard</h2>

//       <div className="bg-white p-6 rounded-xl shadow-md w-96">
//         <p className="mb-2">
//           <strong>Name:</strong> {student.name}
//         </p>
//         <p className="mb-2">
//           <strong>Email:</strong> {student.email}
//         </p>
//         <p className="mb-2">
//           <strong>Course:</strong> {student.course}
//         </p>
//         <p className="mb-2">
//           <strong>Enrollment Date:</strong>{" "}
//           {new Date(student.enrollmentDate).toLocaleDateString()}
//         </p>

//         <Link
//           to="/student/edit"
//           className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Edit Profile
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

// src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axiosConfig";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/students/profile/me"); // backend route
      setStudent(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!student) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Student Dashboard</h2>

      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <p className="mb-2"><strong>Name:</strong> {student.name}</p>
        <p className="mb-2"><strong>Email:</strong> {student.email}</p>
        <p className="mb-2"><strong>Course:</strong> {student.course}</p>
        <p className="mb-2"><strong>Enrollment Date:</strong> {new Date(student.enrollmentDate).toLocaleDateString()}</p>

        <Link
          to="/student/edit"
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
