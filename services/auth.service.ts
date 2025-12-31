import { AuthResponse, User } from "@/types/auth";
import api from "./api";

export const AuthService = {
    login: async (email: string, password: string): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/auth/login", {
            email,
            password,
            deviceInfo: "optional_device_id", // You might want to get this from expo-device
        });
        return response.data;
    },

    register: async (data: any): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/auth/register", {
            ...data,
            deviceInfo: "optional_device_id",
        });
        return response.data;
    },

    logout: async (refreshToken: string): Promise<void> => {
        await api.post("/auth/logout", { refreshToken });
    },

    forgotPassword: async (email: string): Promise<void> => {
        await api.post("/auth/forgot-password", { email });
    },

    validateResetToken: async (token: string): Promise<void> => {
        await api.post(`/auth/validate-reset-password-token?token=${token}`);
    },

    resetPassword: async (token: string, newPassword: string): Promise<void> => {
        await api.post("/auth/reset-password", {
            token,
            newPassword,
        });
    },

    // Helper to get user profile if needed separately, though login/register returns it
    getUser: async (): Promise<User> => {
        // Assuming there is a /me or /profile endpoint, but the user didn't specify one.
        // We'll leave this or remove it if not used. 
        // For now, let's assume we rely on the user object from login/register.
        // If we strictly follow the user's list, there IS NO /me endpoint.
        // But often we need to fetch user data if session persists but memory is lost.
        // Let's assume we might need it later or remove it.
        // For now I'll comment it out to avoid errors if the endpoint doesn't exist.
        throw new Error("Method not implemented.");
    }
};
