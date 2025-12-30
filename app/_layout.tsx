import "@/global.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </AuthProvider>
        </ThemeProvider>
    );
}
