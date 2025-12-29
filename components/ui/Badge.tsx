import React from "react";
import { Text, View, ViewProps } from "react-native";

export interface BadgeProps extends ViewProps {
    /** Badge text content */
    children: React.ReactNode;
    /** Badge variant */
    variant?: "default" | "success" | "error" | "warning" | "info";
    /** Badge size */
    size?: "sm" | "md" | "lg";
}

export function Badge({
    children,
    variant = "default",
    size = "md",
    className = "",
    ...props
}: BadgeProps) {
    const variantStyles = {
        default: "bg-surface border border-border",
        success: "bg-success/10 border border-success",
        error: "bg-error/10 border border-error",
        warning: "bg-warning/10 border border-warning",
        info: "bg-info/10 border border-info",
    };

    const textVariantStyles = {
        default: "text-text",
        success: "text-success",
        error: "text-error",
        warning: "text-warning",
        info: "text-info",
    };

    const sizeStyles = {
        sm: "px-2 py-0.5",
        md: "px-2.5 py-1",
        lg: "px-3 py-1.5",
    };

    const textSizeStyles = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
    };

    return (
        <View
            className={`
                rounded-full items-center justify-center
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${className}
            `}
            {...props}
        >
            <Text
                className={`${textVariantStyles[variant]} ${textSizeStyles[size]} font-semibold`}
            >
                {children}
            </Text>
        </View>
    );
}
