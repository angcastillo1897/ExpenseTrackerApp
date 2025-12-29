import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Image, ImageProps, Text, View } from "react-native";

export interface AvatarProps extends Omit<ImageProps, "source"> {
    /** Image source URI */
    source?: string;
    /** Fallback initials */
    initials?: string;
    /** Avatar size */
    size?: "sm" | "md" | "lg" | "xl";
    /** Show online indicator */
    online?: boolean;
}

export function Avatar({
    source,
    initials,
    size = "md",
    online = false,
    className = "",
    ...props
}: AvatarProps) {
    const sizeStyles = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
        xl: "w-24 h-24",
    };

    const textSizeStyles = {
        sm: "text-xs",
        md: "text-base",
        lg: "text-xl",
        xl: "text-3xl",
    };

    const indicatorSizeStyles = {
        sm: "w-2 h-2",
        md: "w-3 h-3",
        lg: "w-4 h-4",
        xl: "w-5 h-5",
    };

    return (
        <View className="relative">
            <View
                className={`
                    ${sizeStyles[size]}
                    rounded-full bg-primary items-center justify-center overflow-hidden
                    ${className}
                `}
            >
                {source ? (
                    <Image
                        source={{ uri: source }}
                        className="w-full h-full"
                        {...props}
                    />
                ) : initials ? (
                    <Text
                        className={`text-white font-semibold ${textSizeStyles[size]}`}
                    >
                        {initials.substring(0, 2).toUpperCase()}
                    </Text>
                ) : (
                    <Feather
                        name="user"
                        size={
                            size === "sm"
                                ? 16
                                : size === "md"
                                  ? 24
                                  : size === "lg"
                                    ? 32
                                    : 48
                        }
                        color="#FFFFFF"
                    />
                )}
            </View>

            {online && (
                <View
                    className={`
                        absolute bottom-0 right-0
                        ${indicatorSizeStyles[size]}
                        rounded-full bg-success border-2 border-background
                    `}
                />
            )}
        </View>
    );
}
