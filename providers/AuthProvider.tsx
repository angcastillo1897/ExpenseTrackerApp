import { AuthState, User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType extends AuthState {
    setSession: (user: User, accessToken: string) => Promise<void>;
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
        // Index handles its own routing, so we only protect specific routes here
        const segment = rootSegment as string;

        // Protect authenticated routes - redirect to login if not authenticated
        const protectedRoutes = [
            "index",
            "transactions",
            "categories",
            "profile",
        ];
        if (!state.isAuthenticated && protectedRoutes.includes(segment)) {
            router.replace("/login");
        }

        // Redirect authenticated users away from auth screens
        const authRoutes = ["login", "register"];
        if (state.isAuthenticated && authRoutes.includes(segment)) {
            router.replace("/(tabs)");
        }
    }, [state.isAuthenticated, state.isLoading, rootSegment]);

    const setSession = async (user: User, accessToken: string) => {
        await AsyncStorage.setItem("userToken", accessToken);
        await AsyncStorage.setItem("userData", JSON.stringify(user));

        setState({
            token: accessToken,
            user,
            isAuthenticated: true,
            isLoading: false,
        });

        router.replace("/(tabs)");
    };

    const signOut = async () => {
        try {
            // Clear all stored user data and tokens
            await AsyncStorage.multiRemove(["userToken", "userData"]);
        } catch (e) {
            console.error("Logout failed", e);
        }

        setState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
        });

        router.replace("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                setSession,
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
