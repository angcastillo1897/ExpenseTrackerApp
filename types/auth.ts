import { User } from "./user";

export interface AuthResponse {
    accessToken: string;
    tokenType: string;
    user: User;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export interface AuthRegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
