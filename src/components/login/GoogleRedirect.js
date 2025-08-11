import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function GoogleRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            localStorage.setItem("token", token);
            try {
                const decoded = jwtDecode(token);
                const role =
                    decoded.role ||
                    decoded.roles ||
                    decoded.authorities?.[0] ||
                    decoded.realm_access?.roles?.[0];

                if (role === "ROLE_ADMIN" || role === "ROLE_USER") {
                    navigate("/admin/home");
                } else {
                    console.error("Vai trò không xác định.");
                    navigate("/login");
                }
            } catch (e) {
                console.error("Decode token thất bại:", e);
                navigate("/login");
            }
        }
    }, [navigate]);

    return <h2>Đang đăng nhập bằng Google...</h2>;
}
