import axios from "axios";
import auth from "../config/auth";

const api = axios.create({
  baseURL: auth.baseUrl,
});

export const useApi = () => ({
  validateToken: async (token: string) => {
    try {
      const response = await api.get(`/checkuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Erro ao validar token:", error);
    }
  },
  signin: async (email: string, password: string) => {
    const response = await api.post("/signin", { email, password });
    return response.data;
  },
  register: async (name: string, email: string, password: string) => {
    const response = await api.post("/register", { name, email, password });
    return response.data;
  },
  signout: async () => {
    const response = await api.post("/signout");
    return response.data;
  },
});
