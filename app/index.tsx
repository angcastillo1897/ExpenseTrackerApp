import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-background">
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    if (isAuthenticated) {
        return <Redirect href="/(tabs)/index" />;
    }

    return <Redirect href="/login" />;
}
