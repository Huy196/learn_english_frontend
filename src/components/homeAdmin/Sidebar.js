// src/components/homeAdmin/Sidebar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import confirmAlert from "../../utils/Alert";

export default function Sidebar({ activeItem, onNavigate }) {
    const navigate = useNavigate();

    const handleClick = (path, key) => {
        onNavigate(key);
        navigate(path);
    };

    const handleLogout = async () => {
        const confirmed = await confirmAlert({
            title: "Are you sure you want to log out?",
            text: "This action cannot be undone!",
            icon: "warning",
            confirmText: "Log out",
            cancelText: "Cancel"
        });

        if (!confirmed) return;

        localStorage.removeItem("token");
        sessionStorage.setItem("loggedOut", "true");
        navigate("/login");
    };

    return (
        <div className="sidebar">
            <h3 className="sidebar-title">🔧 Admin Menu</h3>
            <ul className="menu-list">
                <li
                    className={`menu-item ${activeItem === "users" ? "active" : ""}`}
                    onClick={() => handleClick("/admin/home", "users")}
                >
                    📋 User List
                </li>
                <li
                    className={`menu-item ${activeItem === "add" ? "active" : ""}`}
                    onClick={() => handleClick("/admin/home", "add")}
                >
                    ➕ Add User
                </li>
                <li
                    className={`menu-item ${activeItem === "settings" ? "active" : ""}`}
                    onClick={() => handleClick("/settings", "settings")}
                >
                    ⚙️ Settings
                </li>
                <li
                    className="menu-item"
                    onClick={handleLogout}
                >
                    🚪 Log out
                </li>
            </ul>
        </div>
    );
}
