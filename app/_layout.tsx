import "@/global.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
    );
}
