import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../login/InputField";
import { validateField } from "../../utils/Validate";
import "../../assets/css/Login.css";
import "../../assets/css/Sign.css";
import { Link } from "react-router-dom";
import Google from "../../assets/image/Google.png";
import AuthService from "../../services/AuthService";
import { jwtDecode } from "jwt-decode";

export default function SignForm() {
    const [form, setForm] = useState({});
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(prev => !prev);
    };

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        let error = validateField(name, value);

        if (name === "confirmPassword") {
            if (form.password?.value && value !== form.password.value) {
                error = "Passwords do not match";
            } else {
                error = "";
            }
        }

        setForm(prev => ({
            ...prev,
            [name]: { value, error }
        }));

        setMessage("")

    };

    const handleSubmit = async () => {
        const isFilled = ['username', 'password'].every(field => form[field]?.value);
        const isError = ['username', 'password'].every(field => form[field]?.error);

        if (!isFilled || isError) {
            setMessage("Please enter valid username and password");
            return;
        }

        if (form.password.value !== form.confirmPassword.value) {
            setMessage("Passwords do not match");
            return;
        }


        try {
            const userPayload = {
                email: form.username.value, 
                password: form.password.value,
                roles: ["ROLE_USER"]
            };

            await AuthService.register(userPayload);

            navigate("/", { state: { successMessage: "Sign up successful! Please log in." } });
        } catch (error) {
            setMessage(error.response?.data?.message || "This account already exists. Please use another email or username");
        }

    }



    return (
        <>
            <div className="tabs">
                <span className="tab active">Sign up</span>

                <Link to="/login" className="tab">Log in</Link>
            </div>

            <div className="dividerss"></div>
            <form>
                <InputField
                    label="Email"
                    name="username"
                    placeholder="Enter your email address or username"
                    value={form.username?.value || ""}
                    onChange={handleChange}
                    className={form.username?.error ? "custom-input-error" : ""}
                /> {form.username?.error && (
                    <div className="error-message">{form.username.error}</div>
                )}

                <div className="password-field">
                    <InputField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={form.password?.value || ""}
                        onChange={handleChange}
                        className={form.password?.error ? "custom-input-error" : ""}
                    />
                    <span className="toggle-eye" onClick={toggleShowPassword}>
                        {showPassword ? "🙈" : "👁️"}
                    </span>
                </div>
                {form.password?.error && (
                    <div className="error-message">{form.password.error}</div>
                )}

                <div className="password-field">
                    <InputField
                        label="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Re-enter your password"
                        value={form.confirmPassword?.value || ""}
                        onChange={handleChange}
                        className={form.password?.error ? "custom-input-error" : ""}
                    />

                    <span className="toggle-eye" onClick={toggleShowConfirmPassword}>
                        {showConfirmPassword ? "🙈" : "👁️"}
                    </span>
                </div>


                {message && <p className="error">{message}</p>}

                <button type="button" className="btn-submit" onClick={handleSubmit}>Sign in</button>

                <p className="terms">
                    By clicking Log in, you accept Quizlet's{" "}
                    <a href="/terms">Terms of Service</a> and{" "}
                    <a href="/privacy">Privacy Policy</a>.
                </p>
                <p className="register-link">
                    Already have an account?{" "}
                    <Link to="/login">Log in</Link>
                </p>

            </form>

        </>
    )
}