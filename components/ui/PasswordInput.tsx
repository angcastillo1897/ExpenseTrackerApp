import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Input, InputProps } from "./Input";

export interface PasswordInputProps extends Omit<
    InputProps,
    "secureTextEntry" | "rightIcon"
> {
    /** Show password strength indicator */
    showStrength?: boolean;
}

export function PasswordInput({
    showStrength = false,
    ...props
}: PasswordInputProps) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const EyeIcon = (
        <TouchableOpacity
            onPress={toggleVisibility}
            accessibilityLabel={isVisible ? "Hide password" : "Show password"}
            accessibilityRole="button"
        >
            <Feather
                name={isVisible ? "eye-off" : "eye"}
                size={20}
                color="#9CA3AF"
            />
        </TouchableOpacity>
    );

    return (
        <Input
            secureTextEntry={!isVisible}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            rightIcon={EyeIcon}
            {...props}
        />
    );
}
