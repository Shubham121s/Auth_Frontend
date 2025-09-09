import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
import API from "../api/axiosConfig";

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);   // Stores user object (name, email, role)
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    // Load user from localStorage on refresh
    useEffect(() => {
        if (token && localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, [token]);

    // Login handler
    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        // Redirect by role
        if (userData.role === "Admin") {
            navigate("/admin");
        } else {
            navigate("/student");
        }
    };

    // Logout handler
    const logout = async () => {
        try {
            await API.post("/auth/logout"); // invalidate on backend
        } catch (err) {
            console.error("Logout error", err.response?.data || err.message);
        }
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
