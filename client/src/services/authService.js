import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/auth",
    withCredentials: true, // send/receive cookies
});

const handleError = (err) => {
    // normalize error
    if (err.response && err.response.data) return Promise.reject(err.response.data);
    return Promise.reject({ message: err.message || "An unknown error occurred" });
};

export const register = async ({ name, email, password }) => {
    try {
        const res = await api.post("/register", { name, email, password });
        return res.data; // { user }
    } catch (err) {
        return handleError(err);
    }
};

export const login = async ({ email, password }) => {
    try {
        const res = await api.post("/login", { email, password });
        return res.data; // { user }
    } catch (err) {
        return handleError(err);
    }
};

export const logout = async () => {
    try {
        const res = await api.post("/logout");
        return res.data; // { message }
    } catch (err) {
        return handleError(err);
    }
};

export const getCurrentUser = async () => {
    try {
        const res = await api.get("/profile");
        return res.data; // { user }
    } catch (err) {
        return handleError(err);
    }
};

const authService = { register, login, logout, getCurrentUser };

export default authService;