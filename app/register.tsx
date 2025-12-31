import { Button, Input, PasswordInput } from "@/components/ui";
import { useRegisterMutation } from "@/hooks/useAuthMutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as z from "zod";

const registerSchema = z
    .object({
        firstName: z.string().min(2, { message: "El nombre es requerido" }),
        lastName: z.string().min(2, { message: "El apellido es requerido" }),
        email: z.email({ message: "Email incorrecto" }),
        password: z
            .string()
            .min(8, {
                message: "La contraseña debe tener al menos 8 caracteres",
            })
            .regex(/[A-Z]/, {
                message: "La contraseña debe tener al menos una mayúscula",
            })
            .regex(/[0-9]/, {
                message: "La contraseña debe tener al menos un número",
            })
            .regex(/[^A-Za-z0-9]/, {
                message: "La contraseña debe tener al menos un símbolo",
            }),
        confirmPassword: z.string().min(8, {
            message: "La confirmación debe tener al menos 8 caracteres",
        }),
        deviceInfo: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
    const router = useRouter();
    const registerMutation = useRegisterMutation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            deviceInfo: Platform.OS + " " + Platform.Version,
        },
    });

    const onSubmit = (data: RegisterFormData) => {
        const { confirmPassword, ...submissionData } = data;
        registerMutation.mutate(submissionData, {
            onError: (error: any) => {
                console.error("Register failed:", error);
                const message =
                    error?.response?.data?.message ||
                    error.message ||
                    "Error en el registro";
                alert(message);
            },
        });
    };

    return (
        <SafeAreaView
            className="flex-1 bg-background"
            edges={["top", "bottom"]}
        >
            <View className="flex-1 px-6 justify-center">
                <View className="mb-4">
                    <Text className="text-3xl font-bold text-text mb-2">
                        Crear Cuenta
                    </Text>
                    <Text className="text-text-secondary text-base">
                        Regístrate para comenzar a gestionar tus gastos
                    </Text>
                </View>

                <View className="gap-3">
                    <Controller
                        control={control}
                        name="firstName"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Nombre"
                                placeholder="Tu nombre"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={errors.firstName?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="lastName"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Apellido"
                                placeholder="Tu apellido"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={errors.lastName?.message}
                            />
                        )}
                    />

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
                                placeholder="Crea tu contraseña"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={errors.password?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <PasswordInput
                                label="Confirmar Contraseña"
                                placeholder="Repite tu contraseña"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={errors.confirmPassword?.message}
                            />
                        )}
                    />

                    <Button
                        onPress={handleSubmit(onSubmit)}
                        loading={registerMutation.isPending}
                        size="lg"
                        className="mt-2"
                    >
                        Registrarse
                    </Button>
                </View>

                <View className="flex-row justify-center items-center mt-6 gap-1">
                    <Text className="text-text-secondary">
                        ¿Ya tienes una cuenta?
                    </Text>
                    <Button
                        variant="ghost"
                        size="sm"
                        onPress={() => router.back()}
                        className="px-0 h-auto py-0 min-h-0"
                    >
                        <Text className="text-primary font-bold">
                            Inicia sesión
                        </Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}
