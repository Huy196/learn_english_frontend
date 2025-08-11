import axios from "axios";

const API_URL = "http://localhost:8080/api";

const AuthService = {
    login: async (email, password) => {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data.token;
    }
};

export default AuthService;
