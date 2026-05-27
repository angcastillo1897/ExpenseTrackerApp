import { CATEGORY_ICONS, IconOption } from "@/constants/categoryOptions";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface IconPickerProps {
    selectedIcon: string;
    onIconChange: (key: string) => void;
    disabled?: boolean;
    icons?: IconOption[];
}

export function IconPicker({
    selectedIcon,
    onIconChange,
    disabled = false,
    icons = CATEGORY_ICONS,
}: IconPickerProps) {
    const [showPicker, setShowPicker] = useState(false);

    return (
        <View className="mb-8">
            <View className="flex-row items-center justify-between mb-3">
                <Text className="text-sm font-semibold text-gray-900 dark:text-white">
                    Icono
                </Text>
                <Pressable
                    onPress={() => setShowPicker(!showPicker)}
                    disabled={disabled}
                >
                    <Text className="text-blue-500 dark:text-blue-400">
                        {showPicker ? "Ocultar opciones" : "Ver opciones"}
                    </Text>
                </Pressable>
            </View>

            <Pressable
                className="flex-row items-center gap-3 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                onPress={() => setShowPicker(!showPicker)}
                disabled={disabled}
            >
                <FontAwesome6
                    name={selectedIcon as any}
                    size={20}
                    color="#3B82F6"
                />
                <Text className="text-gray-700 dark:text-gray-300 font-medium">
                    {icons.find((c) => c.key === selectedIcon)?.name ||
                        "Seleccionar Icono"}
                </Text>
            </Pressable>

            {/* Icon Picker Grid */}
            {showPicker && (
                <View className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4 border border-gray-200 dark:border-gray-700">
                    <View className="flex-row flex-wrap gap-3">
                        {icons.map((icon) => (
                            <Pressable
                                key={icon.key}
                                onPress={() => {
                                    onIconChange(icon.key);
                                }}
                                className={`flex-1 min-w-[70px] items-center justify-center p-3 rounded-lg border-2 ${
                                    selectedIcon === icon.key
                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                        : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700"
                                }`}
                                disabled={disabled}
                            >
                                <FontAwesome6
                                    name={icon.key as any}
                                    size={20}
                                    color={
                                        selectedIcon === icon.key
                                            ? "#3B82F6"
                                            : "#6B7280"
                                    }
                                />
                            </Pressable>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
}
