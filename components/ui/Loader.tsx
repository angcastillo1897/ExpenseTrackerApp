import React from "react";
import { ActivityIndicator, Text, View, ViewProps } from "react-native";

export interface LoaderProps extends ViewProps {
    /** Loading message */
    message?: string;
    /** Loader size */
    size?: "small" | "large";
    /** Loader color */
    color?: string;
    /** Show as fullscreen overlay */
    fullscreen?: boolean;
}

export function Loader({
    message,
    size = "large",
    color = "#3B82F6",
    fullscreen = false,
    className = "",
    ...props
}: LoaderProps) {
    const content = (
        <View
            className={`items-center justify-center gap-3 ${className}`}
            accessibilityRole="progressbar"
            accessibilityLabel={message || "Loading"}
            {...props}
        >
            <ActivityIndicator size={size} color={color} />
            {message && (
                <Text className="text-text-secondary text-base">{message}</Text>
            )}
        </View>
    );

    if (fullscreen) {
        return (
            <View className="flex-1 bg-background items-center justify-center">
                {content}
            </View>
        );
    }

    return content;
}
