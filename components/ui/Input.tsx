import React, { useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

export interface InputProps extends TextInputProps {
    /** Input label */
    label?: string;
    /** Error message to display */
    error?: string;
    /** Helper text below input */
    helperText?: string;
    /** Show required indicator */
    required?: boolean;
    /** Left icon component */
    leftIcon?: React.ReactNode;
    /** Right icon component */
    rightIcon?: React.ReactNode;
    /** Container class name */
    containerClassName?: string;
}

export function Input({
    label,
    error,
    helperText,
    required = false,
    leftIcon,
    rightIcon,
    containerClassName = "",
    className = "",
    ...props
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    const hasError = !!error;

    return (
        <View className={containerClassName}>
            {/* Label */}
            {label && (
                <Text className="text-text mb-2 font-medium">
                    {label}
                    {required && <Text className="text-error"> *</Text>}
                </Text>
            )}

            {/* Input Container */}
            <View
                className={`
                    flex-row items-center
                    bg-input-bg rounded-lg
                    border
                    ${hasError ? "border-error" : isFocused ? "border-input-focus" : "border-input-border"}
                    ${props.editable === false ? "opacity-50" : ""}
                `}
            >
                {/* Left Icon */}
                {leftIcon && <View className="pl-3">{leftIcon}</View>}

                {/* Text Input */}
                <TextInput
                    className={`
                        flex-1 p-3 text-text
                        ${leftIcon ? "pl-2" : ""}
                        ${rightIcon ? "pr-2" : ""}
                        ${className}
                    `}
                    placeholderTextColor="#9CA3AF"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    accessibilityLabel={label}
                    accessibilityHint={required ? "Campo requerido" : undefined}
                    {...props}
                />

                {/* Right Icon */}
                {rightIcon && <View className="pr-3">{rightIcon}</View>}
            </View>

            {/* Error Message */}
            {hasError && (
                <Text
                    className="text-error text-sm mt-1"
                    accessibilityLiveRegion="polite"
                >
                    {error}
                </Text>
            )}

            {/* Helper Text */}
            {!hasError && helperText && (
                <Text className="text-text-secondary text-sm mt-1">
                    {helperText}
                </Text>
            )}
        </View>
    );
}
