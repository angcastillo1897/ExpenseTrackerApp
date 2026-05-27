import { CATEGORY_COLORS, ColorOption } from "@/constants/categoryOptions";
import { useTheme } from "@/providers/ThemeProvider";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface ColorPickerProps {
    selectedColor: string;
    onColorChange: (hex: string) => void;
    disabled?: boolean;
    colors?: ColorOption[];
}

export function ColorPicker({
    selectedColor,
    onColorChange,
    disabled = false,
    colors = CATEGORY_COLORS,
}: ColorPickerProps) {
    const { theme } = useTheme();
    const [showPicker, setShowPicker] = useState(false);

    return (
        <View className="mb-6">
            <View className="flex-row items-center justify-between mb-3">
                <Text className="text-sm font-semibold text-gray-900 dark:text-white">
                    Color
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
                className="flex-row items-center gap-3 mb-3"
                onPress={() => setShowPicker(!showPicker)}
                disabled={disabled}
            >
                <View
                    className="w-10 h-10 rounded-full border-3 border-gray-300 dark:border-gray-600"
                    style={{ backgroundColor: selectedColor }}
                />
                <Text className="text-gray-700 dark:text-gray-300 font-medium">
                    {colors.find((c) => c.hex === selectedColor)?.name ||
                        "Seleccionar Color"}
                </Text>
            </Pressable>

            {/* Color Picker Grid */}
            {showPicker && (
                <View className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <View className="flex-row flex-wrap gap-4">
                        {colors.map((color) => (
                            <Pressable
                                key={color.hex}
                                onPress={() => {
                                    onColorChange(color.hex);
                                }}
                                className="items-center gap-2"
                                disabled={disabled}
                            >
                                <View
                                    className={`w-12 h-12 rounded-lg border-3 ${
                                        selectedColor === color.hex
                                            ? "border-gray-900 dark:border-white"
                                            : "border-transparent"
                                    }`}
                                    style={{
                                        backgroundColor: color.hex,
                                    }}
                                />
                            </Pressable>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
}
