// src/components/homeAdmin/Sidebar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Sweetalert from "sweetalert2";


export default function Sidebar({ activeItem, onNavigate }) {
    const navigate = useNavigate();

    const handleClick = (path, key) => {
        onNavigate(key);
        navigate(path);
    };

    const handleLogout = async () => {
    const confirmed = await Sweetalert({
        title: "Xác nhận đăng xuất",
        text: "Bạn có chắc chắn muốn đăng xuất?",
        icon: "warning",
        confirmText: "Đăng xuất",
        cancelText: "Huỷ"
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
                    📋 Danh sách người dùng
                </li>
                <li
                    className={`menu-item ${activeItem === "add" ? "active" : ""}`}
                    onClick={() => handleClick("/admin/home", "add")}
                >
                    ➕ Thêm người dùng
                </li>
                <li
                    className={`menu-item ${activeItem === "settings" ? "active" : ""}`}
                    onClick={() => handleClick("/settings", "settings")}
                >
                    ⚙️ Cài đặt
                </li>
                <li
                    className="menu-item"
                    onClick={() => {
                        localStorage.removeItem("authToken");
                        handleLogout();
                    }}
                >
                    🚪 Đăng xuất
                </li>
            </ul>
        </div>
    );
}
