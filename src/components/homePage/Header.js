import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Header.css";
import defaultAvatar from "../../assets/image/defalut.jpg";
import Swal from "sweetalert2";

export default function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showMenu, setShowMenu] = useState(false); 
    const menuRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        const confirmed = await Swal.fire({
            title: 'Bạn có chắc muốn đăng xuất?',
            text: "Bạn sẽ phải đăng nhập lại để tiếp tục.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Đăng xuất',
            cancelButtonText: 'Hủy',
        });

        if (confirmed.isConfirmed) {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            sessionStorage.setItem("loggedOut", "true"); // thêm thông báo đăng xuất
            navigate("/login");
        }
    };

    return (
        <header className="quizlet-header">
            <div className="logo" onClick={() => navigate("/")}>Quizlet</div>

            <nav className="menu">
                <select className="dropdown-select">
                    <option value="">Study tools</option>
                    <option value="flashcards">Flashcards</option>
                    <option value="practice">Practice</option>
                    <option value="test">Test</option>
                </select>

                <select className="dropdown-select">
                    <option value="">Subjects</option>
                    <option value="math">Math</option>
                    <option value="science">Science</option>
                    <option value="history">History</option>
                </select>
            </nav>

            <div className="search-bar">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Flashcard sets, textbooks, questions"
                />
            </div>

            <div className="actions">
                {isLoggedIn ? (
                    <div className="user-dropdown" ref={menuRef}>
                        <div
                            className="avatar-with-arrow"
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <img src={defaultAvatar} alt="User Avatar" className="user-avatar" />
                        </div>

                        {showMenu && (
                            <div className="settings-menu">
                                <div
                                    className="menu-item"
                                    onClick={() => {
                                        navigate("/profile");
                                        setShowMenu(false);
                                    }}
                                >
                                    Profile
                                </div>
                                <div
                                    className="menu-item"
                                    onClick={handleLogout}
                                >
                                    Log out
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <button className="login-btn" onClick={() => navigate("/login")}>
                        Log in
                    </button>
                )}
            </div>
        </header>
    );
}
