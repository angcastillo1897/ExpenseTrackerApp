import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Text, View, ViewProps } from "react-native";

export interface AlertProps extends ViewProps {
    /** Alert title */
    title?: string;
    /** Alert message */
    message: string;
    /** Alert variant */
    variant?: "info" | "success" | "warning" | "error";
    /** Show icon */
    showIcon?: boolean;
}

export function Alert({
    title,
    message,
    variant = "info",
    showIcon = true,
    className = "",
    ...props
}: AlertProps) {
    const variantStyles = {
        info: "bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700",
        success:
            "bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700",
        warning:
            "bg-yellow-50 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700",
        error: "bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700",
    };

    const iconNames = {
        info: "info" as const,
        success: "check-circle" as const,
        warning: "triangle-exclamation" as const,
        error: "circle-xmark" as const,
    };

    const iconColors = {
        info: "#3B82F6",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
    };

    const textColors = {
        info: "text-blue-800 dark:text-blue-200",
        success: "text-green-800 dark:text-green-200",
        warning: "text-yellow-800 dark:text-yellow-200",
        error: "text-red-800 dark:text-red-200",
    };

    return (
        <View
            className={`
                p-4 rounded-lg border-l-4 flex-row gap-3
                ${variantStyles[variant]}
                ${className}
            `}
            accessibilityRole="alert"
            {...props}
        >
            {showIcon && (
                <FontAwesome6
                    name={iconNames[variant]}
                    size={20}
                    color={iconColors[variant]}
                />
            )}
            <View className="flex-1">
                {title && (
                    <Text
                        className={`font-semibold mb-1 ${textColors[variant]}`}
                    >
                        {title}
                    </Text>
                )}
                <Text className={textColors[variant]}>{message}</Text>
            </View>
        </View>
    );
}
