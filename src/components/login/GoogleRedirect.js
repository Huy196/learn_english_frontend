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

                if (role === "ROLE_USER") {
                    navigate("/homePage");
                } else {
                    console.error("Unrecognized role.");
                    navigate("/login");
                }
            } catch (e) {
                console.error("Failed to decode token:", e);
                navigate("/login");
            }
        }
    }, [navigate]);

    return <h2>Logging in with Google...</h2>;
}
