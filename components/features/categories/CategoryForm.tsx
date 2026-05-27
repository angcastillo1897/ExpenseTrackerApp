import { Button } from "@/components/ui";
import { Input } from "@/components/ui/Input";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/constants/categoryOptions";
import { useTheme } from "@/providers/ThemeProvider";
import { CategoryType } from "@/types/category";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { ColorPicker } from "./ColorPicker";
import { IconPicker } from "./IconPicker";

export interface CategoryFormData {
    name: string;
    type?: CategoryType;
    color: string;
    iconName: string;
}

interface CategoryFormProps {
    initialName?: string;
    initialType?: CategoryType;
    initialColor?: string;
    initialIcon?: string;
    isLoading?: boolean;
    onSubmit: (data: CategoryFormData) => void;
    onCancel: () => void;
    submitButtonLabel?: string;
    showTypeSelector?: boolean;
    showGlobalWarning?: boolean;
}

export function CategoryForm({
    initialName = "",
    initialType = "INCOME",
    initialColor = CATEGORY_COLORS[0].hex,
    initialIcon = CATEGORY_ICONS[0].key,
    isLoading = false,
    onSubmit,
    onCancel,
    submitButtonLabel = "Crear Categoría",
    showTypeSelector = true,
    showGlobalWarning = false,
}: CategoryFormProps) {
    const { theme } = useTheme();
    const [name, setName] = useState(initialName);
    const [type, setType] = useState<CategoryType>(initialType);
    const [selectedColor, setSelectedColor] = useState(initialColor);
    const [selectedIcon, setSelectedIcon] = useState(initialIcon);

    // Reset form when initial values change (for edit mode)
    useEffect(() => {
        setName(initialName);
        setType(initialType);
        setSelectedColor(initialColor);
        setSelectedIcon(initialIcon);
    }, [initialName, initialType, initialColor, initialIcon]);

    const handleSubmit = () => {
        if (!name.trim()) {
            return;
        }

        const formData: CategoryFormData = {
            name: name.trim(),
            color: selectedColor,
            iconName: selectedIcon,
        };

        if (showTypeSelector) {
            formData.type = type;
        }

        onSubmit(formData);
    };

    return (
        <View className="flex-1">
            {/* Global Warning */}
            {showGlobalWarning && (
                <View className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 mx-6 mt-6 rounded-lg">
                    <View className="flex-row items-center gap-3">
                        <FontAwesome6 name="lock" size={20} color="#EF4444" />
                        <View className="flex-1">
                            <Text className="text-sm font-semibold text-red-900 dark:text-red-100">
                                Categoría Global
                            </Text>
                            <Text className="text-xs text-red-800 dark:text-red-200 mt-1">
                                No puedes editar categorías globales
                            </Text>
                        </View>
                    </View>
                </View>
            )}

            {/* Name Input */}
            <View className="mb-6 px-6 pt-6">
                <Text className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Nombre de la Categoría
                </Text>
                <Input
                    placeholder="e.g., Salario, Comida, Transporte"
                    value={name}
                    onChangeText={setName}
                    editable={!isLoading && !showGlobalWarning}
                />
            </View>

            {/* Type Selection */}
            {showTypeSelector && (
                <View className="mb-6 px-6">
                    <Text className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Tipo de Categoría
                    </Text>
                    <View className="flex-row gap-3">
                        <Pressable
                            onPress={() => setType("INCOME")}
                            disabled={isLoading || showGlobalWarning}
                            className={`flex-1 py-3 px-4 rounded-lg border-2 items-center ${
                                type === "INCOME"
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                            }`}
                        >
                            <Text
                                className={`font-semibold ${
                                    type === "INCOME"
                                        ? "text-blue-700 dark:text-blue-300"
                                        : "text-gray-700 dark:text-gray-300"
                                }`}
                            >
                                Ingresos
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setType("EXPENSE")}
                            disabled={isLoading || showGlobalWarning}
                            className={`flex-1 py-3 px-4 rounded-lg border-2 items-center ${
                                type === "EXPENSE"
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                            }`}
                        >
                            <Text
                                className={`font-semibold ${
                                    type === "EXPENSE"
                                        ? "text-blue-700 dark:text-blue-300"
                                        : "text-gray-700 dark:text-gray-300"
                                }`}
                            >
                                Gastos
                            </Text>
                        </Pressable>
                    </View>
                </View>
            )}

            {/* Color Picker */}
            <View className="px-6">
                <ColorPicker
                    selectedColor={selectedColor}
                    onColorChange={setSelectedColor}
                    disabled={isLoading || showGlobalWarning}
                />
            </View>

            {/* Icon Picker */}
            <View className="px-6">
                <IconPicker
                    selectedIcon={selectedIcon}
                    onIconChange={setSelectedIcon}
                    disabled={isLoading || showGlobalWarning}
                />
            </View>

            {/* Action Buttons */}
            <View className="gap-3 px-6 pb-6">
                <Button
                    onPress={handleSubmit}
                    disabled={isLoading || !name.trim() || showGlobalWarning}
                >
                    {isLoading ? (
                        <View className="flex-row items-center justify-center gap-2">
                            <ActivityIndicator size="small" color="white" />
                            <Text className="text-white font-semibold">
                                {submitButtonLabel === "Crear Categoría"
                                    ? "Creando..."
                                    : "Actualizando..."}
                            </Text>
                        </View>
                    ) : (
                        <Text className="text-white font-semibold text-center">
                            {submitButtonLabel}
                        </Text>
                    )}
                </Button>
                <Button
                    onPress={onCancel}
                    disabled={isLoading}
                    variant="outline"
                >
                    <Text className="text-gray-900 dark:text-white font-semibold text-center">
                        Cancelar
                    </Text>
                </Button>
            </View>
        </View>
    );
}
