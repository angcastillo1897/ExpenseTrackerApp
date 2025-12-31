import { AuthService } from "@/services/auth.service";
import { AuthState, User } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType extends AuthState {
    setSession: (
        user: User,
        accessToken: string,
        refreshToken: string
    ) => Promise<void>;
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
        // valid segments: "home" | "login" | "register" | "showcase" | "_sitemap"
        // checking against string directly to avoid strict type checks if segments list is incomplete in types
        const segment = rootSegment as string;
        const inAuthGroup =
            segment === "(auth)" ||
            segment === "login" ||
            segment === "register" ||
            segment === "index";

        // If not authenticated and NOT in auth group, redirect to login
        // But for now, let's just protect "home" specifically as checking inverse is tricky with string matches
        const inProtectedGroup = segment === "home";

        if (!state.isAuthenticated && inProtectedGroup) {
            router.replace("/login");
        } else if (
            state.isAuthenticated &&
            (segment === "login" ||
                segment === "register" ||
                segment === "index" ||
                !segment)
        ) {
            router.replace("/home");
        }
    }, [state.isAuthenticated, state.isLoading, rootSegment]);

    const setSession = async (
        user: User,
        accessToken: string,
        refreshToken: string
    ) => {
        await AsyncStorage.setItem("userToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        await AsyncStorage.setItem("userData", JSON.stringify(user));

        setState({
            token: accessToken,
            user,
            isAuthenticated: true,
            isLoading: false,
        });

        router.replace("/home");
    };

    const signOut = async () => {
        try {
            const refreshToken = await AsyncStorage.getItem("refreshToken");
            if (refreshToken) {
                await AuthService.logout(refreshToken);
            }
        } catch (e) {
            console.error("Logout failed", e);
        }

        await AsyncStorage.clear();

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
