import axios from "axios";
import auth from "../config/auth";

const api = axios.create({
  baseURL: auth.baseUrl,
});

export const useApi = () => ({
    validateToken: async(token: string) => {
        const response = await api.post('validate', { token });
        return response.data
    },
    signin: async(email: string, password: string) => {
        const response = await api.post("/signin", { email, password })
        return response.data
    },
    signout: async() => {
        const response = await api.post('/signout');
        return response.data;
    }
})