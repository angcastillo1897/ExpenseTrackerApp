import React from "react";
import { Pressable, Text, View } from "react-native";

export interface Tab<T> {
    label: string;
    value: T;
    color?: string; // Custom color for this tab (optional)
}

interface TabSectionProps<T> {
    tabs: Tab<T>[];
    activeTab: T;
    onTabChange: (value: T) => void;
    containerClassName?: string;
    activeClassName?: string;
    inactiveClassName?: string;
    textActiveClassName?: string;
    textInactiveClassName?: string;
}

export function TabSection<T extends string | number>({
    tabs,
    activeTab,
    onTabChange,
    containerClassName = "flex-row gap-2 mb-6",
    activeClassName = "bg-primary",
    inactiveClassName = "bg-gray-200 dark:bg-gray-700",
    textActiveClassName = "text-white",
    textInactiveClassName = "text-gray-700 dark:text-gray-300",
}: TabSectionProps<T>) {
    return (
        <View className={containerClassName}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.value;
                const bgColor = isActive
                    ? tab.color || activeClassName
                    : inactiveClassName;
                const textColor = isActive
                    ? textActiveClassName
                    : textInactiveClassName;

                return (
                    <Pressable
                        key={String(tab.value)}
                        onPress={() => onTabChange(tab.value)}
                        className={`flex-1 py-3 px-4 rounded-lg items-center ${bgColor}`}
                    >
                        <Text className={`font-semibold ${textColor}`}>
                            {tab.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
