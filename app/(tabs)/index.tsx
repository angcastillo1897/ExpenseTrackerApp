import { useAuth } from "@/providers/AuthProvider";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MenuScreen() {
    const { user } = useAuth();

    return (
        <SafeAreaView className="flex-1 bg-background justify-center items-center p-6">
            <View className="w-full gap-4">
                <View className="bg-surface p-6 rounded-2xl shadow-sm border border-border">
                    <Text className="text-text-secondary text-base text-center">
                        Bienvenido a tu gestor de gastos. Esta es la página de
                        inicio protegida.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
