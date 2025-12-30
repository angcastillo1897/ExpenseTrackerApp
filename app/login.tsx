import { Button, Input, PasswordInput } from "@/components/ui";
import { useAuth } from "@/providers/AuthProvider";
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
    const { signIn } = useAuth();

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
            await signIn(data.email, data.password);
        } catch (error: any) {
            console.error("Login failed:", error);
            alert(error.message || "Error al iniciar sesión");
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
                        onPress={() => router.push("/register")}
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
