import { Loader } from "@/components/ui/Loader";
import { TabSection, type Tab } from "@/components/ui/TabSection";
import { useCategoriesByType } from "@/hooks/useCategories";
import { useAlert } from "@/providers/AlertProvider";
import { useAuth } from "@/providers/AuthProvider";
import { Category } from "@/types/category";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TabType = "INCOME" | "EXPENSE";

export default function CategoriesScreen() {
    const router = useRouter();
    const alert = useAlert();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<TabType>("INCOME");

    const {
        data: categoriesData,
        isLoading,
        error,
    } = useCategoriesByType(activeTab);

    const categoryTabs: Tab<TabType>[] = [
        { label: "Ingresos", value: "INCOME" },
        { label: "Gastos", value: "EXPENSE" },
    ];

    const handleCategoryPress = (category: Category) => {
        if (category.isGlobal) {
            alert.error(
                "No puedes editar categorías globales",
                "Acción no permitida",
            );
            return;
        }
        router.push(`/edit-category?id=${category.id}`);
    };

    const renderCategoryCard = ({ item }: { item: Category }) => (
        <Pressable
            onPress={() => handleCategoryPress(item)}
            className="bg-white dark:bg-gray-800 rounded-lg py-4 px-2 flex-column items-center justify-center shadow-sm h-28 gap-2 active:opacity-80"
            style={{ backgroundColor: item.color }}
        >
            <FontAwesome6 name={item.iconName} size={16} color="#FFFFFF" />
            <Text className="text-[12px] text-white text-center">
                {item.name}
            </Text>
        </Pressable>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
            <View className="px-6 pt-6">
                {/* Tab Navigation */}
                <TabSection
                    tabs={categoryTabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
            </View>

            {/* Content */}
            {isLoading ? (
                <View className="flex-1 justify-center items-center">
                    <Loader />
                </View>
            ) : error ? (
                <View className="flex-1 justify-center items-center px-6">
                    <Text className="text-red-600 dark:text-red-400 text-center text-lg">
                        Failed to load categories
                    </Text>
                    <Text className="text-gray-600 dark:text-gray-400 text-center mt-2">
                        {error instanceof Error
                            ? error.message
                            : "Unknown error"}
                    </Text>
                </View>
            ) : !categoriesData || categoriesData.length === 0 ? (
                <View className="flex-1 justify-center items-center px-6">
                    <Text className="text-gray-600 dark:text-gray-400 text-center text-lg">
                        No {activeTab.toLowerCase()} categories found
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={categoriesData}
                    renderItem={({ item }) => (
                        <View className="w-1/3 p-1.5 h-full">
                            {renderCategoryCard({ item })}
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingBottom: 20,
                    }}
                    scrollEnabled
                />
            )}

            {/* Floating Action Button */}
            <Pressable
                onPress={() => router.push("/add-category")}
                className="absolute bottom-8 right-6 bg-blue-500 active:bg-blue-600 rounded-full w-14 h-14 justify-center items-center shadow-lg"
            >
                <FontAwesome6 name="plus" size={24} color="#FFFFFF" />
            </Pressable>
        </SafeAreaView>
    );
}
