import React, { useState } from "react";
import uploadFile from "../../services/UploadFile";
import { register } from "../../services/UserService";
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
                title: "You are not logged in!",
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
                title: "User added successfully!",
                icon: "success",
                timer: 2000,
                position: "top-end"
            });
        } catch (error) {
            showToast({
                title: "Failed to add user!",
                icon: "error",
                timer: 2000,
                position: "top-end"
            });
        }
    };

    return (
        <>
            <button
                className="menu-item"
                onClick={() => setActiveItem("users")}
                style={{ cursor: "pointer", padding: "8px 16px" }}
            >
                🔙 Back
            </button>
            <form className="add-user-form" onSubmit={handleSubmit}>
                <h2>Add User</h2>

                <label>Full Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <label>Age</label>
                <input
                    type="text"
                    name="age"
                    placeholder="Enter age"
                    value={formData.age}
                    onChange={handleChange}
                />

                <label>Profile Picture</label>
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

                <button type="submit">➕ Add User</button>
            </form>
        </>
    );
}
