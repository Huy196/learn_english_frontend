import { useEffect } from "react";
import "../../assets/css/Login.css";
import showToast from "../../utils/ShowToast";
import LoginForm from "./LoginForm";
import leftSideImg from "../../assets/image/leftSide.png";


export default function Login() {
    useEffect(() => {
        const loggedOut = sessionStorage.getItem("loggedOut");
        if (loggedOut) {
            showToast({
                title: "Đã đăng xuất thành công!",
                icon: "success",
                timer: 2000,
                position: "top-end"
            });
            sessionStorage.removeItem("loggedOut");
        }
    }, []);

    return (
        <div class="login-page">
            <div class="left-section">
                <img
                    alt="White headphones resting on a stack of colorful books in pink, orange, yellow, and green covers"
                    className="absolute top-1/2 left-1/2 w-auto min-w-full min-h-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
                    src={leftSideImg}
                />
            </div>
            <div class="right-section">
                <LoginForm />
            </div>
              
        </div>
    );
}
