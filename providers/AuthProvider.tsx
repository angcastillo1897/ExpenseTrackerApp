import { AuthService } from "@/services/auth.service";
import { AuthState } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType extends AuthState {
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (data: any) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        token: null,
        isLoading: true,
        isAuthenticated: false,
    });
    const rootSegment = useSegments()[0];
    const router = useRouter();

    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await AsyncStorage.getItem("userToken");
                const userJson = await AsyncStorage.getItem("userData");

                if (token && userJson) {
                    const user = JSON.parse(userJson);
                    // Optional: Validate token with API
                    setState({
                        token,
                        user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } else {
                    setState((prev) => ({ ...prev, isLoading: false }));
                }
            } catch (e) {
                console.error("Failed to load token", e);
                setState((prev) => ({ ...prev, isLoading: false }));
            }
        };

        loadToken();
    }, []);

    useEffect(() => {
        if (state.isLoading) return;

        // Route Protection Logic
        const inAuthGroup = rootSegment === "home";

        if (!state.isAuthenticated && inAuthGroup) {
            router.replace("/");
        } else if (
            state.isAuthenticated &&
            (!rootSegment ||
                rootSegment === "login" ||
                rootSegment === "register")
        ) {
            router.replace("/home");
        }
    }, [state.isAuthenticated, state.isLoading, rootSegment]);

    const signIn = async (email: string, password: string) => {
        try {
            const response = await AuthService.login(email, password);

            await AsyncStorage.setItem("userToken", response.token);
            await AsyncStorage.setItem(
                "userData",
                JSON.stringify(response.user)
            );

            setState({
                token: response.token,
                user: response.user,
                isAuthenticated: true,
                isLoading: false,
            });

            // Navigate to home after successful login
            router.replace("/home");
        } catch (error) {
            //  console.error(error);
            throw error;
        }
    };

    const signUp = async (data: any) => {
        try {
            const response = await AuthService.register(data);

            await AsyncStorage.setItem("userToken", response.token);
            await AsyncStorage.setItem(
                "userData",
                JSON.stringify(response.user)
            );

            setState({
                token: response.token,
                user: response.user,
                isAuthenticated: true,
                isLoading: false,
            });

            router.replace("/home");
        } catch (error) {
            throw error;
        }
    };

    const signOut = async () => {
        await AuthService.logout();
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("userData");

        setState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
        });

        router.replace("/"); // Go back to Login/Index
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                signIn,
                signUp,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
