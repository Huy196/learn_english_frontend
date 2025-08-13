import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import uploadFile from "../../services/UploadFile";
import { register } from "../../services/UserService";
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
            // Show({
            //     title: "Bạn chưa đăng nhập!",
            //     icon: "error",
            //     timer: 2000,
            //     position: "top-end"
            // });
            return;
        }

        try {
            const imageUploadForm = new FormData();
            formData.imageFiles.forEach((file) => {
                imageUploadForm.append("imageFiles", file);
            });

            const uploadResponse = await uploadFile.uploadFile(imageUploadForm, token);
            const imageNames = uploadResponse;
            console.log("ten fdiekf" , imageNames)

            const userPayload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                age: formData.age,
                roles: ["ROLE_USER"],
                images: imageNames,
            };

            await register(userPayload, token);

            // Reset form và preview
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
            alert("Thêm người dùng thành công!");
        } catch (error) {
            console.error(error);
            alert("Thêm người dùng thất bại!");
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
                <input
                    type="text"
                    name="name"
                    placeholder="Họ và tên"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="age"
                    placeholder="Tuổi"
                    value={formData.age}
                    onChange={handleChange}
                />


                <input
                    type="file"
                    name="imageFiles"
                    multiple
                    onChange={handleChange}
                />

                {/* Hiển thị ảnh xem trước */}
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
