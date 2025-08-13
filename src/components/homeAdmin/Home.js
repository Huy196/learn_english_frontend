import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/HomeAdmin.css";
import Sidebar from "./Sidebar";

import { getAllUsers } from "../../services/UserService";
import UserTable from "./UserTable";
import AddUser from "./AddUser";



export default function Home() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [activeItem, setActiveItem] = useState("users");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchUsers = useCallback(async () => {
    if (!token) {
      setError("Chưa đăng nhập!");
      setTimeout(() => navigate("/", { replace: true }), 1500);
      return;
    }

    try {
      const { data } = await getAllUsers(token);
      setUsers(data);
      setError("");
    } catch (err) {
      const status = err.response?.status;
      if (status === 403) setError("Bạn không có quyền truy cập!");
      else if (status === 401) setError("Token không hợp lệ hoặc chưa đăng nhập!");
      else setError("Không thể kết nối đến máy chủ.");
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEditUser = (user) => {
  };

  const handleDelete = async (id) => {

  }

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
        return <AddUser setActiveItem={setActiveItem} onSuccess={handleRefreshUsers} />;
      // case "edit":
      // return editingUser && (
      //     <UpdateUser
      //         setActiveItem={setActiveItem}
      //         user={editingUser}
      //         onSuccess={handleRefreshUsers}
      //     />
      // );
      default:
        return null;
    }
  };

  return (
    <div className="page">
      <Sidebar activeItem={activeItem} onNavigate={setActiveItem} />
      <div className="content page-content">
        {renderContent()}
      </div>

    </div>
  );
}
