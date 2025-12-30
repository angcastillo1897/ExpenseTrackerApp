import { Button } from "@/components/ui";
import { useAuth } from "@/providers/AuthProvider";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const { user, signOut } = useAuth();

    return (
        <SafeAreaView className="flex-1 bg-background justify-center items-center p-6">
            <View className="items-center mb-8">
                <Text className="text-3xl font-bold text-text mb-2">
                    Hola, {user?.firstName || "Usuario"}!
                </Text>
                <Text className="text-text-secondary text-base text-center">
                    Bienvenido a tu gestor de gastos. Esta es la página de
                    inicio protegida.
                </Text>
            </View>

            <View className="w-full gap-4">
                <View className="bg-surface p-6 rounded-2xl shadow-sm border border-border">
                    <Text className="text-lg font-bold text-text mb-1">
                        Tu ID de Sesión (Mock)
                    </Text>
                    <Text className="text-text-secondary mb-4 numberOfLines={1}">
                        {user?.id}
                    </Text>
                    <Text className="text-lg font-bold text-text mb-1">
                        Email
                    </Text>
                    <Text className="text-text-secondary">{user?.email}</Text>
                </View>

                <Button onPress={signOut} variant="outline" size="lg">
                    Cerrar Sesión
                </Button>
            </View>
        </SafeAreaView>
    );
}
