import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import uploadFile from "../../services/UploadFile";
import { register } from "../../services/UserService";
import Swal from "sweetalert2";
import showToast from "../../utils/ShowToast";


export default function AddUser({ onSuccess, setActiveItem }) {
    const [previewImages, setPreviewImages] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        roles: "",
        imageFiles: [],
    });

    const handleChange = (e) => {


        const { name, value, files } = e.target;
        if (name === "imageFiles") {
            const selectedFiles = Array.from(files);
            setFormData({ ...formData, imageFiles: selectedFiles });

            const previews = selectedFiles.map((file) =>
                URL.createObjectURL(file)
            );
            setPreviewImages(previews);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            showToast({
                title: "Bạn chưa đăng nhập!",
                icon: "error",
                timer: 2000,
                position: "top-end"
            });
            return;
        }

        try {
            const imageUploadForm = new FormData();
            formData.imageFiles.forEach((file) => {
                imageUploadForm.append("imageFiles", file);
            });

            const uploadResponse = await uploadFile.uploadFile(imageUploadForm, token);
            const imageNames = uploadResponse;

            const userPayload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                age: formData.age,
                roles: ["ROLE_USER"],
                images: imageNames,
            };

            await register(userPayload, token);


            setFormData({
                name: "",
                email: "",
                password: "",
                age: "",
                roles: "ROLE_USER",
                imageFiles: [],
            });
            setPreviewImages([]);

            if (onSuccess) onSuccess();

            showToast({
                title: "Thêm người dùng thành công!",
                icon: "success",
                timer: 2000,
                position: "top-end"
            });
        } catch (error) {
            showToast({
                title: "Thêm người dùng thất bại!",
                icon: "error",
                timer: 2000,
                position: "top-end"
            });
        }
    };

    return (
        <>  <button
            className="menu-item"
            onClick={() => setActiveItem("users")}
            style={{ cursor: "pointer", padding: "8px 16px" }}
        >
            🔙 Quay lại
        </button>
            <form className="add-user-form" onSubmit={handleSubmit}>
                <h2>Thêm Người Dùng</h2>

                <label>Họ và tên</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Nhập họ và tên"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Nhập email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Mật khẩu</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <label>Tuổi</label>
                <input
                    type="text"
                    name="age"
                    placeholder="Nhập tuổi"
                    value={formData.age}
                    onChange={handleChange}
                />

                <label>Ảnh đại diện</label>
                <input
                    type="file"
                    name="imageFiles"
                    multiple
                    onChange={handleChange}
                />

                <div className="preview-container">
                    {previewImages.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`preview-${index}`}
                            className="preview-image"
                        />
                    ))}
                </div>

                <button type="submit">➕ Thêm người dùng</button>
            </form>

        </>
    );
}
