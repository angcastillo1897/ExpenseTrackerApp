import Feather from "@expo/vector-icons/Feather";
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
        info: "bg-info/10 border-info",
        success: "bg-success/10 border-success",
        warning: "bg-warning/10 border-warning",
        error: "bg-error/10 border-error",
    };

    const iconNames = {
        info: "info" as const,
        success: "check-circle" as const,
        warning: "alert-triangle" as const,
        error: "alert-circle" as const,
    };

    const iconColors = {
        info: "#3B82F6",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
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
                <Feather
                    name={iconNames[variant]}
                    size={20}
                    color={iconColors[variant]}
                />
            )}
            <View className="flex-1">
                {title && (
                    <Text className="text-text font-semibold mb-1">
                        {title}
                    </Text>
                )}
                <Text className="text-text-secondary">{message}</Text>
            </View>
        </View>
    );
}
