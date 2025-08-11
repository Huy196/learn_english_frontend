import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { validateField } from "../../utils/Validate";
import AuthService from "../../services/AuthService";
import { jwtDecode } from "jwt-decode";
import "../../assets/css/Login.css";
import { Link } from "react-router-dom";
import Google from "../../assets/image/Google.png";



export default function LoginForm() {
    const [form, setForm] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);

        setForm(prev => ({
            ...prev,
            [name]: { value, error }
        }));
    };

    const loginWithGoogle = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    const handleSubmit = async () => {
        const isFilled = ['username', 'password'].every(field => form[field]?.value);
        const isError = ['username', 'password'].some(field => form[field]?.error);

        if (!isFilled || isError) {
            setMessage("Please enter valid username and password");
            return;
        }

        try {
            const token = await AuthService.login(form.username.value, form.password.value);

            console.log("toekn", token)
            if (token) {
                localStorage.setItem("token", token);
                const decoded = jwtDecode(token);
                const role = decoded.role || decoded.roles?.[0];

                if (role === "ROLE_ADMIN" || role === "ROLE_USER") {
                    navigate("/admin/home");
                } else {
                    setMessage("Unknown role: " + role);
                }
            } else {
                setMessage("Login failed: Token not found");
            }
        } catch (err) {
            setMessage(err.response?.data?.message || "Server error. Please try again later.");
        }
    };



    return (
        <>
            <div className="tabs">
                <Link to="/admin/register" className="tab">Sign up</Link>
                <span className="tab active">Log in</span>
            </div>
            <div className="social-login">
                <button className="social-btn google" onClick={loginWithGoogle}>

                    <img
                        src={Google}
                        alt="Google"
                        className="google-icon"
                    />  Log in with Google</button>
            </div>

            <div className="divider">or email</div>

            <form>
                <InputField
                    label="Email"
                    name="username"
                    placeholder="Enter your email address or username"
                    value={form.username?.value || ""}
                    error={form.username?.error}
                    onChange={handleChange}
                />
                <div className="password-field">
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password?.value || ""}
                        error={form.password?.error}
                        onChange={handleChange}
                    />
                </div>
                <Link to="/forgot-password" className="forgot-link">
                    Forgot password
                </Link>


                <p className="terms">
                    By clicking Log in, you accept Quizlet's{" "}
                    <a href="/terms">Terms of Service</a> and{" "}
                    <a href="/privacy">Privacy Policy</a>.
                </p>

                <button type="button" className="btn-submit" onClick={handleSubmit}>Log in</button>

                <p className="register-link">
                    Chưa có tài khoản?{" "}
                    <Link to="/admin/register">Đăng ký ngay</Link>
                </p>

                {message && <p className="error">{message}</p>}
            </form>

        </>
    );
}
