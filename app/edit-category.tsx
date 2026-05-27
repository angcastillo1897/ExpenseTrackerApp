import {
    CategoryForm,
    CategoryFormData,
} from "@/components/features/categories";
import { useUpdateCategory } from "@/hooks/useCategories";
import { useAlert } from "@/providers/AlertProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { CategoriesService } from "@/services/categories.service";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditCategoryScreen() {
    const router = useRouter();
    const alert = useAlert();
    const { theme } = useTheme();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { mutate: updateCategory, isPending } = useUpdateCategory();
    const [isGlobal, setIsGlobal] = useState(false);

    // Fetch category data
    const {
        data: category,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["category", id],
        queryFn: async () => {
            // Get all categories and find the one we need
            const expenseCategories =
                await CategoriesService.getCategoriesByType("EXPENSE");
            const incomeCategories =
                await CategoriesService.getCategoriesByType("INCOME");
            const allCategories = [...expenseCategories, ...incomeCategories];
            return allCategories.find((cat) => cat.id === parseInt(id!));
        },
        enabled: !!id,
    });

    // Initialize global flag when category loads
    useEffect(() => {
        if (category) {
            setIsGlobal(category.isGlobal);
        }
    }, [category]);

    const handleSubmit = (data: CategoryFormData) => {
        if (!id) return;

        updateCategory(
            {
                id: parseInt(id),
                name: data.name,
                color: data.color,
                iconName: data.iconName,
            },
            {
                onSuccess: () => {
                    alert.success("Categoría actualizada exitosamente");
                    router.back();
                },
                onError: (error) => {
                    alert.error(
                        error instanceof Error
                            ? error.message
                            : "Error al actualizar la categoría",
                        "Error",
                    );
                },
            },
        );
    };

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-white dark:bg-gray-900 justify-center items-center">
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }

    if (error || !category) {
        return (
            <SafeAreaView className="flex-1 bg-white dark:bg-gray-900 justify-center items-center px-6">
                <Text className="text-red-600 dark:text-red-400 text-center text-lg">
                    Error al cargar la categoría
                </Text>
                <Pressable
                    onPress={() => router.back()}
                    className="mt-6 bg-blue-500 px-6 py-3 rounded-lg"
                >
                    <Text className="text-white font-semibold text-center">
                        Atrás
                    </Text>
                </Pressable>
            </SafeAreaView>
        );
    }

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
                        Editar Categoría
                    </Text>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <CategoryForm
                    initialName={category.name}
                    initialColor={category.color}
                    initialIcon={category.iconName}
                    isLoading={isPending}
                    onSubmit={handleSubmit}
                    onCancel={() => router.back()}
                    submitButtonLabel="Actualizar Categoría"
                    showTypeSelector={false}
                    showGlobalWarning={isGlobal}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
