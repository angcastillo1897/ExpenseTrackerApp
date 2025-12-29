import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { colorScheme } from "nativewind";
import React, { createContext, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { themes } from "../utils/colorTheme";

interface ThemeProviderProps {
    children: React.ReactNode;
}

type ThemeContextType = {
    theme: "light" | "dark";
    toggleTheme: () => void;
    isLoading: boolean;
};

const THEME_STORAGE_KEY = "@expense_tracker_theme";

export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {},
    isLoading: true,
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
    const [isLoading, setIsLoading] = useState(true);

    // Load saved theme on mount
    useEffect(() => {
        loadSavedTheme();
    }, []);

    const loadSavedTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme === "light" || savedTheme === "dark") {
                setCurrentTheme(savedTheme);
                colorScheme.set(savedTheme);
            }
        } catch (error) {
            // If loading fails, use default light theme
            console.error("Failed to load theme:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleTheme = async () => {
        const newTheme = currentTheme === "light" ? "dark" : "light";
        setCurrentTheme(newTheme);
        colorScheme.set(newTheme);

        // Save theme preference
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
        } catch (error) {
            console.error("Failed to save theme:", error);
        }
    };

    return (
        <ThemeContext.Provider
            value={{ theme: currentTheme, toggleTheme, isLoading }}
        >
            <StatusBar style={currentTheme === "dark" ? "light" : "dark"} />
            <View style={themes[currentTheme]} className="flex-1">
                {children}
            </View>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
