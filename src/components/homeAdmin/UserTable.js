import React from "react";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

export default function UserTable({ users, onEdit, onDelete, setActiveItem, activeItem }) {
    const handleToggle = () => {
        setActiveItem(prev => (prev === "add" ? "users" : "add"));
    };
    return (
        <>
            <h2 className="title">📋 User List</h2>

            <button
                className="menu-item"
                onClick={handleToggle}
                style={{ cursor: "pointer", margin: "10px 0", padding: "8px 16px" }}
            >
                {activeItem === "add" ? "🔙 Back" : "➕ Add User"}
            </button>

            <table className="table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Image</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        const imageName = user.images?.[0] || "default.jpg";
                        const imageUrl = `${BASE_URL}/uploadFile/${imageName}`;

                        return (
                            <tr key={user.email}>
                                <td>{index + 1}</td>
                                <td>
                                    <img
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            objectFit: "cover",
                                            borderRadius: "50%"
                                        }}
                                    />
                                </td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>
                                    <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                                        <button onClick={() => onEdit(user)} className="btn-icon" title="Edit">
                                            ✏️
                                        </button>
                                        <button onClick={() => onDelete(user.id)} className="btn-icon" title="Delete">
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
