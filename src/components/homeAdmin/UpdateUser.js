import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadFile from "../../services/UploadFile";
import { update } from "../../services/UserService";
import showToast from "../../utils/ShowToast";


export default function UpdateUser({ onSuccess, user, setActiveItem }) {
    const [formData, setFormData] = useState({
        id: user.id,
        name: "",
        email: "",
        password: "",
        age: "",
        imageFiles: [],
    });
    const [previewImages, setPreviewImages] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                password: "",
                age: user.age || "",
                imageFiles: [],
            });

            if (user.images && user.images.length > 0) {
                const previews = user.images.map(
                    img => `http://localhost:8080/uploadFile/${img}`
                );
                setPreviewImages(previews);
            } else {
                setPreviewImages([]);
            }
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({ ...prev, imageFiles: files }));

        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            showToast({
                title: "Bạn chưa đăng nhập!",
                icon: "error",
                timer: 2000,
                position: "top-end"
            });
            return;
        }

        try {
            let imageNames = user.images || [];

            if (formData.imageFiles && formData.imageFiles.length > 0) {
                const imageUploadForm = new FormData();
                formData.imageFiles.forEach(file => {
                    imageUploadForm.append("imageFiles", file);
                });

                const uploadResponse = await uploadFile.uploadFile(imageUploadForm, token);
                imageNames = uploadResponse;

            }

            const userPayload = {
                id: user.id,
                name: formData.name,
                email: formData.email,
                password: formData.password || "",
                age: formData.age,
                images: imageNames,
            };

            console.log("fgsud", userPayload)

            await update(userPayload, token)

            showToast({
                title: "Cập nhật người dùng thành công!",
                icon: "success",
                timer: 2000,
                position: "top-end"
            });

            if (onSuccess) onSuccess();
            setActiveItem("users");

        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
            showToast({
                title: "Cập nhật thất bại!",
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
                style={{ cursor: "pointer", padding: "8px 16px", marginBottom: "16px" }}
            >
                🔙 Quay lại
            </button>

            <form className="add-user-form" onSubmit={handleSubmit}>
                <h2>✏️ Cập nhật Người Dùng</h2>

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
                    type="number"
                    name="age"
                    placeholder="Tuổi"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />

                <input
                    type="file"
                    name="imageFiles"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <div className="preview-container">
                    {previewImages.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`preview-${index}`}
                            className="preview-image"
                            style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                marginRight: "10px",
                            }}
                        />
                    ))}
                </div>

                <button type="submit" style={{ marginTop: "16px" }}>
                    💾 Lưu thay đổi
                </button>
            </form>
        </>
    )

}