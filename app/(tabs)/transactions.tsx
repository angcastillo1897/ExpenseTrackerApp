import { useAuth } from "@/providers/AuthProvider";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransactionsScreen() {
    const { user } = useAuth();

    return (
        <SafeAreaView className="flex-1 bg-background justify-center items-center p-6">
            <View className="items-center mb-8">
                <Text className="text-3xl font-bold text-text mb-2">
                    Hola, {user?.firstName || "Usuario"}!
                </Text>
            </View>
        </SafeAreaView>
    );
}
