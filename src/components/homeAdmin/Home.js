import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/HomeAdmin.css";
import Sidebar from "./Sidebar";
import confirmAlert from "../../utils/Alert";
import { getAllUsers, deleteUser } from "../../services/UserService";
import UserTable from "./UserTable";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import showToast from "../../utils/ShowToast";
import axios from "axios";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [activeItem, setActiveItem] = useState("users");
  const [editingUser, setEditingUser] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchUsers = useCallback(async () => {
    if (!token) {
      setError("Not logged in!");
      setTimeout(() => navigate("/", { replace: true }), 1500);
      return;
    }

    try {
      const { data } = await getAllUsers(token);
      setUsers(data);
      setError("");
    } catch (err) {
      const status = err.response?.status;
      if (status === 403) setError("You do not have permission to access!");
      else if (status === 401) setError("Invalid token or not logged in!");
      else setError("Cannot connect to the server.");
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEditUser = (user) => {
    setEditingUser(user);
    setActiveItem("edit");
  };

  const handleDelete = async (id) => {
    const confirmed = await confirmAlert({
      title: "Are you sure you want to delete?",
      text: "This action cannot be undone!",
      icon: "warning",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmed) return;

    try {
      await deleteUser(id, token);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      showToast({
        title: "User deleted successfully!",
        icon: "success",
        timer: 2000,
        position: "top-end",
      });
    } catch (error) {
      showToast({
        title: "Error deleting user!",
        icon: "error",
        timer: 2000,
        position: "top-end",
      });
    }
  };

  const handleRefreshUsers = async () => {
    await fetchUsers();
    setActiveItem("users");
  };

  const renderContent = () => {
    if (error) return <p className="error-message">{error}</p>;

    switch (activeItem) {
      case "users":
        return (
          <UserTable
            users={users}
            onDelete={handleDelete}
            onEdit={handleEditUser}
            setActiveItem={setActiveItem}
            activeItem={activeItem}
          />
        );
      case "add":
        return (
          <AddUser
            setActiveItem={setActiveItem}
            onSuccess={handleRefreshUsers}
          />
        );
      case "edit":
        return (
          editingUser && (
            <UpdateUser
              setActiveItem={setActiveItem}
              user={editingUser}
              onSuccess={handleRefreshUsers}
            />
          )
        );
      default:
        return null;
    }
  };

  return (
    <div className="page">
      <Sidebar activeItem={activeItem} onNavigate={setActiveItem} />
      <div className="content page-content">{renderContent()}</div>
    </div>
  );
}
