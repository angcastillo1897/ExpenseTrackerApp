import { useTheme } from "@/providers/ThemeProvider";
import { colorValues } from "@/utils/colorTheme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tabs } from "expo-router";

export default function TabLayout() {
    const { theme } = useTheme();
    const colors = colorValues[theme];

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopColor: colors.border,
                },
                animation: "shift",
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: "Menu",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 size={18} name="house" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="transactions"
                options={{
                    tabBarLabel: "Transacciones",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6
                            size={18}
                            name="money-check-dollar"
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="categories"
                options={{
                    tabBarLabel: "Categorias",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6
                            size={18}
                            name="list-check"
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarLabel: "Perfil",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 size={18} name="user" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
