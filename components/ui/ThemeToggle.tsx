import { useTheme } from "@/providers/ThemeProvider";
import Feather from "@expo/vector-icons/Feather";
import * as Haptics from "expo-haptics";
import { useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

interface IconProps {
    icon: "sun" | "moon";
    isActive: boolean;
}

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const translateX = useSharedValue(0);

    // Animate the indicator position when theme changes
    useEffect(() => {
        translateX.value = withSpring(theme === "dark" ? 40 : 0, {
            damping: 20,
            stiffness: 180,
            overshootClamping: true,
        });
    }, [theme]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        toggleTheme();
    };

    return (
        <Pressable
            onPress={handlePress}
            className="w-24 h-12 p-1 bg-surface relative flex-row rounded-full items-center justify-between border border-border"
        >
            {/* Animated indicator */}
            <Animated.View
                style={animatedStyle}
                className="absolute left-1 w-10 h-10 bg-primary rounded-full shadow-lg"
            />

            <Icon icon="sun" isActive={theme === "light"} />
            <Icon icon="moon" isActive={theme === "dark"} />
        </Pressable>
    );
};

const Icon = ({ icon, isActive }: IconProps) => {
    return (
        <View className="w-10 h-10 relative z-50 rounded-full items-center justify-center">
            <Feather
                name={icon}
                size={20}
                color={isActive ? "#FFFFFF" : "#9CA3AF"}
            />
        </View>
    );
};

export default ThemeToggle;
