import * as Haptics from "expo-haptics";
import React, { useEffect } from "react";
import { Pressable, PressableProps, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

export interface SwitchProps extends Omit<PressableProps, "children"> {
    /** Switch label */
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

export function Switch({
    label,
    checked,
    onCheckedChange,
    disabled = false,
    haptic = true,
    className = "",
    ...props
}: SwitchProps) {
    const translateX = useSharedValue(checked ? 21 : 1);

    useEffect(() => {
        translateX.value = withSpring(checked ? 21 : 1, {
            damping: 20,
            stiffness: 190,
            overshootClamping: true,
        });
    }, [checked]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

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
            accessibilityRole="switch"
            accessibilityState={{ checked, disabled }}
            accessibilityLabel={label}
            {...props}
        >
            {label && (
                <Text
                    className={`text-text flex-1 ${disabled ? "opacity-50" : ""}`}
                >
                    {label}
                </Text>
            )}
            <View
                className={`
                    w-12 h-6 rounded-full p-0.5
                    ${checked ? "bg-primary" : "bg-input-border"}
                    ${disabled ? "opacity-50" : ""}
                `}
            >
                <Animated.View
                    style={animatedStyle}
                    className="w-5 h-5 rounded-full bg-white shadow-sm"
                />
            </View>
        </Pressable>
    );
}
