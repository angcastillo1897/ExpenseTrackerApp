import {
    CategoryForm,
    CategoryFormData,
} from "@/components/features/categories";
import { useCreateCategory } from "@/hooks/useCategories";
import { useAlert } from "@/providers/AlertProvider";
import { useTheme } from "@/providers/ThemeProvider";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddCategoryScreen() {
    const router = useRouter();
    const alert = useAlert();
    const { theme } = useTheme();
    const { mutate: createCategory, isPending } = useCreateCategory();

    const handleSubmit = (data: CategoryFormData) => {
        createCategory(
            {
                name: data.name,
                type: data.type || "INCOME",
                color: data.color,
                iconName: data.iconName,
            },
            {
                onSuccess: () => {
                    alert.success("Categoría creada exitosamente");
                    router.back();
                },
                onError: (error) => {
                    alert.error(
                        error instanceof Error
                            ? error.message
                            : "Error al crear la categoría",
                        "Error",
                    );
                },
            },
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            {/* Header */}
            <View
                style={{
                    backgroundColor: theme === "dark" ? "#1F2937" : "#FFFFFF",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 3,
                }}
                className="px-4 border-b border-gray-200 dark:border-gray-800"
            >
                <View className="h-14 flex-row items-center gap-3">
                    <Pressable
                        onPress={() => router.back()}
                        className="p-2"
                        disabled={isPending}
                    >
                        <FontAwesome6
                            name="arrow-left"
                            size={24}
                            color={theme === "dark" ? "#F3F4F6" : "#111827"}
                        />
                    </Pressable>
                    <Text
                        className={`text-2xl font-bold flex-1 ${
                            theme === "dark" ? "text-gray-100" : "text-gray-900"
                        }`}
                    >
                        Crear Categoría
                    </Text>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <CategoryForm
                    isLoading={isPending}
                    onSubmit={handleSubmit}
                    onCancel={() => router.back()}
                    submitButtonLabel="Crear Categoría"
                    showTypeSelector={true}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
