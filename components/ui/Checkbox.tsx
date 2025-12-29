import Feather from "@expo/vector-icons/Feather";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, PressableProps, Text, View } from "react-native";

export interface CheckboxProps extends Omit<PressableProps, "children"> {
    /** Checkbox label */
    label?: string;
    /** Checked state */
    checked: boolean;
    /** On change handler */
    onCheckedChange: (checked: boolean) => void;
    /** Disabled state */
    disabled?: boolean;
    /** Enable haptic feedback */
    haptic?: boolean;
}

export function Checkbox({
    label,
    checked,
    onCheckedChange,
    disabled = false,
    haptic = true,
    className = "",
    ...props
}: CheckboxProps) {
    const handlePress = () => {
        if (disabled) return;

        if (haptic) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }

        onCheckedChange(!checked);
    };

    return (
        <Pressable
            onPress={handlePress}
            disabled={disabled}
            className={`flex-row items-center gap-3 ${className}`}
            accessibilityRole="checkbox"
            accessibilityState={{ checked, disabled }}
            accessibilityLabel={label}
            {...props}
        >
            <View
                className={`
                    w-6 h-6 rounded border-2 items-center justify-center
                    ${checked ? "bg-primary border-primary" : "bg-input-bg border-input-border"}
                    ${disabled ? "opacity-50" : ""}
                `}
            >
                {checked && <Feather name="check" size={16} color="#FFFFFF" />}
            </View>
            {label && (
                <Text
                    className={`text-text flex-1 ${disabled ? "opacity-50" : ""}`}
                >
                    {label}
                </Text>
            )}
        </Pressable>
    );
}
