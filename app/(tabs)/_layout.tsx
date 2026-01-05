import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "green",
                animation: "shift",
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: "Menu",
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={22} name="wallet" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="transactions"
                options={{
                    tabBarLabel: "Transacciones",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="cash" size={22} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="categories"
                options={{
                    tabBarLabel: "Categorias",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="bookmarks" size={22} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarLabel: "Perfil",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person" size={22} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
