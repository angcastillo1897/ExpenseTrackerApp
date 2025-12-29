import { Button, Input, PasswordInput } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as z from "zod";

const loginSchema = z.object({
    email: z.email({ message: "Email incorrecto" }),
    password: z
        .string()
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            // Local logic simulation
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Login data:", data);
            alert("Login exitoso");

            // Here you would typically handle the login logic
            // For now, we'll just show an alert (conceptually) or navigate

            // Example navigation (if dashboard existed)
            // router.replace("/(tabs)/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <SafeAreaView
            className="flex-1 bg-background"
            edges={["top", "bottom"]}
        >
            <View className="flex-1 px-6 justify-center">
                <View className="mb-8">
                    <Text className="text-3xl font-bold text-text mb-2">
                        Bienvenido
                    </Text>
                    <Text className="text-text-secondary text-base">
                        Inicia sesión para gestionar tus gastos e ingresos
                    </Text>
                </View>

                <View className="gap-4">
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Correo electrónico"
                                placeholder="name@example.com"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={errors.email?.message}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <PasswordInput
                                label="Contraseña"
                                placeholder="Introduce tu contraseña"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={errors.password?.message}
                            />
                        )}
                    />

                    <View className="items-end">
                        <Button
                            variant="ghost"
                            size="sm"
                            onPress={() =>
                                console.log("Olvidaste tu contraseña?")
                            }
                            className="px-0"
                        >
                            Olvidaste tu contraseña?
                        </Button>
                    </View>

                    <Button
                        onPress={handleSubmit(onSubmit)}
                        loading={isSubmitting}
                        size="lg"
                        className="mt-2"
                    >
                        Iniciar sesión
                    </Button>
                </View>

                <View className="flex-row justify-center items-center mt-8 gap-1">
                    <Text className="text-text-secondary">
                        ¿No tienes una cuenta?
                    </Text>
                    <Button
                        variant="ghost"
                        size="sm"
                        onPress={() => console.log("Sign up pressed")}
                        className="px-0 h-auto py-0 min-h-0"
                    >
                        <Text className="text-primary font-bold">
                            Registrate
                        </Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}
