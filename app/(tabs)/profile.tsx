import { Avatar, Button, ThemeToggle } from "@/components/ui";
import { useAuth } from "@/providers/AuthProvider";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
    const { user, signOut } = useAuth();

    return (
        <SafeAreaView className="flex-1 bg-background justify-start items-center gap-4 p-6">
            <View className="w-full gap-4">
                <View className="bg-surface p-6 rounded-2xl shadow-sm border border-border">
                    <View className="flex-row items-center gap-4">
                        <Avatar
                            initials={`${user?.firstName?.charAt(0) || ""}${user?.lastName?.charAt(0) || ""}`}
                            size="lg"
                        />
                        <View>
                            <Text className="text-lg font-bold text-text mb-1">
                                {user?.firstName} {user?.lastName}
                            </Text>
                            <Text className="text-text-secondary">
                                {user?.email}
                            </Text>
                        </View>
                        <View className="ml-auto">
                            <Button variant="ghost" size="sm">
                                Editar
                            </Button>
                        </View>
                    </View>
                </View>

                <View className="gap-2">
                    <Text className="text-lg font-bold text-text">
                        Preferencias
                    </Text>
                    <View className="bg-surface py-6 rounded-2xl shadow-sm border border-border flex-col gap-4">
                        <View className="flex-row items-center gap-4 px-4">
                            <View className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                                <FontAwesome6
                                    name="bell"
                                    size={18}
                                    color="#000000"
                                />
                            </View>
                            <View>
                                <Text className="text-text font-bold">
                                    Notificaciones
                                </Text>
                                <Text className="text-text-secondary text-sm">
                                    Administra tus notificaciones y alertas
                                </Text>
                            </View>
                            <View className="ml-auto">
                                <Button variant="ghost" size="sm">
                                    <FontAwesome6
                                        name="chevron-right"
                                        size={20}
                                        className="text-text"
                                    />
                                </Button>
                            </View>
                        </View>
                        <View className="h-0.5 bg-border" />
                        <View className="flex-row items-center gap-4 px-4">
                            <View className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                                <FontAwesome6
                                    name="palette"
                                    size={18}
                                    color="#000000"
                                />
                            </View>
                            <View>
                                <Text className="text-text font-bold">
                                    Modo Oscuro
                                </Text>
                                <Text className="text-text-secondary text-sm">
                                    Activa el modo oscuro
                                </Text>
                            </View>
                            <View className="ml-auto">
                                <ThemeToggle />
                            </View>
                        </View>
                        <View className="h-0.5 bg-border" />
                        <View className="flex-row items-center gap-4 px-4">
                            <View className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                                <FontAwesome6
                                    name="lock"
                                    size={18}
                                    color="#000000"
                                />
                            </View>
                            <View>
                                <Text className="text-text font-bold">
                                    Seguridad
                                </Text>
                                <Text className="text-text-secondary text-sm">
                                    Contraseña y seguridad
                                </Text>
                            </View>
                            <View className="ml-auto">
                                <Button variant="ghost" size="sm">
                                    <FontAwesome6
                                        name="chevron-right"
                                        size={20}
                                        className="text-text"
                                    />
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="gap-2">
                    <Text className="text-lg font-bold text-text">
                        Preferencias
                    </Text>
                    <View className="bg-surface py-6 rounded-2xl shadow-sm border border-border flex-col gap-4">
                        <View className="flex-row items-center gap-4 px-4">
                            <View className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                                <FontAwesome6
                                    name="question"
                                    size={18}
                                    color="#000000"
                                />
                            </View>
                            <View>
                                <Text className="text-text font-bold">
                                    Centro de ayuda
                                </Text>
                                <Text className="text-text-secondary text-sm">
                                    FAQs y soporte
                                </Text>
                            </View>
                            <View className="ml-auto">
                                <Button variant="ghost" size="sm">
                                    <FontAwesome6
                                        name="chevron-right"
                                        size={20}
                                        className="text-text"
                                    />
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View className="w-full gap-4">
                <Button
                    onPress={() => router.push("/showcase")}
                    variant="outline"
                    size="lg"
                >
                    Ver componentes
                </Button>

                <Button onPress={signOut} variant="outline" size="lg">
                    Cerrar Sesión
                </Button>
            </View>
        </SafeAreaView>
    );
}
