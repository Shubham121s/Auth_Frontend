import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import StudentEdit from "./pages/StudentEdit";
import PrivateRoute from "./routes/PrivateRoute";


function App() {
  return (
    <Router>

      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin-only route */}
          <Route
            path="/admin"
            element={
              <PrivateRoute roles={["Admin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* Student-only route */}
          <Route
            path="/student"
            element={
              <PrivateRoute roles={["Student"]}>
                <StudentDashboard />
              </PrivateRoute>
            }
          />

          {/* Student Profile Edit */}
          <Route
            path="/student/edit"
            element={
              <PrivateRoute roles={["Student"]}>
                <StudentEdit />
              </PrivateRoute>
            }
          />

          {/* Default redirect */}
          <Route path="*" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
