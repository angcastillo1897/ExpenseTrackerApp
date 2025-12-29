import React from "react";
import { Pressable, PressableProps, View, ViewProps } from "react-native";

export interface CardProps extends ViewProps {
    /** Card variant */
    variant?: "default" | "elevated" | "outlined";
    /** Make card pressable */
    pressable?: boolean;
    /** On press handler (only if pressable) */
    onPress?: () => void;
    /** Padding size */
    padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
    children,
    variant = "default",
    pressable = false,
    onPress,
    padding = "md",
    className = "",
    ...props
}: CardProps) {
    const variantStyles = {
        default: "bg-card",
        elevated: "bg-card shadow-lg",
        outlined: "bg-card border border-border",
    };

    const paddingStyles = {
        none: "",
        sm: "p-2",
        md: "p-4",
        lg: "p-6",
    };

    const baseClassName = `
        rounded-lg
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${className}
    `;

    if (pressable && onPress) {
        return (
            <Pressable
                onPress={onPress}
                className={`${baseClassName} active:opacity-80`}
                accessibilityRole="button"
                {...(props as PressableProps)}
            >
                {children}
            </Pressable>
        );
    }

    return (
        <View className={baseClassName} {...props}>
            {children}
        </View>
    );
}
