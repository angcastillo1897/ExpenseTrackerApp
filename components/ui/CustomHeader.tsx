import { useTheme } from "@/providers/ThemeProvider";
import { tabSections } from "@/utils/tabSections";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { usePathname } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "./Button";

export function CustomHeader() {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const pathname = usePathname();

    const section = Object.values(tabSections).find(
        (section) => section.path === pathname,
    );

    return (
        <View
            style={{
                paddingTop: insets.top,
                backgroundColor: theme === "dark" ? "#1F2937" : "#FFFFFF",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 3,
            }}
            className="px-4 border-b border-gray-200 dark:border-gray-800"
        >
            <View className="h-12 flex-row items-center justify-between ">
                <Text
                    className={`text-2xl font-bold items-center ${
                        theme === "dark" ? "text-gray-100" : "text-gray-900"
                    }`}
                >
                    {section?.title}
                </Text>
                <View>
                    <Button variant="secondary" size="sm">
                        <FontAwesome6 name="bars" size={20} />
                    </Button>
                </View>
            </View>
        </View>
    );
}
