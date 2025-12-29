import * as Haptics from "expo-haptics";
import React from "react";
import {
    ActivityIndicator,
    Pressable,
    PressableProps,
    Text,
} from "react-native";

export interface ButtonProps extends PressableProps {
    /** Button text content */
    children: React.ReactNode;
    /** Button variant style */
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    /** Button size */
    size?: "sm" | "md" | "lg";
    /** Show loading spinner */
    loading?: boolean;
    /** Disable button */
    disabled?: boolean;
    /** Full width button */
    fullWidth?: boolean;
    /** Enable haptic feedback on press */
    haptic?: boolean;
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    fullWidth = false,
    haptic = true,
    onPress,
    className = "",
    ...props
}: ButtonProps) {
    const handlePress = (event: any) => {
        if (loading || disabled) return;

        if (haptic) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }

        onPress?.(event);
    };

    // Variant styles
    const variantStyles = {
        primary: "bg-primary active:bg-primary-dark active:opacity-80",
        secondary: "bg-surface active:bg-divider border border-border",
        outline: "bg-transparent border-2 border-primary active:bg-surface",
        ghost: "bg-transparent active:bg-surface",
        danger: "bg-error active:opacity-80",
    };

    // Size styles
    const sizeStyles = {
        sm: "px-3 py-2",
        md: "px-4 py-3",
        lg: "px-6 py-4",
    };

    // Text styles
    const textVariantStyles = {
        primary: "text-white font-semibold",
        secondary: "text-text font-semibold",
        outline: "text-primary font-semibold",
        ghost: "text-text font-semibold",
        danger: "text-white font-semibold",
    };

    const textSizeStyles = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
    };

    const isDisabled = disabled || loading;

    return (
        <Pressable
            onPress={handlePress}
            disabled={isDisabled}
            className={`
                rounded-lg items-center justify-center flex-row
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${fullWidth ? "w-full" : ""}
                ${isDisabled ? "opacity-50" : ""}
                ${className}
            `}
            accessibilityRole="button"
            accessibilityState={{ disabled: isDisabled, busy: loading }}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={
                        variant === "primary" || variant === "danger"
                            ? "#FFFFFF"
                            : "#3B82F6"
                    }
                />
            ) : (
                <Text
                    className={`${textVariantStyles[variant]} ${textSizeStyles[size]}`}
                >
                    {children}
                </Text>
            )}
        </Pressable>
    );
}
