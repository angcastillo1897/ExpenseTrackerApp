import { useAuth } from "@/providers/AuthProvider";
import { AuthService } from "@/services/auth.service";
import { AuthRegisterData, AuthResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
    const { setSession } = useAuth();

    return useMutation({
        mutationFn: ({ email, password }: any) =>
            AuthService.login(email, password),
        onSuccess: (data: AuthResponse) => {
            setSession(data.user, data.accessToken);
        },
    });
};

export const useRegisterMutation = () => {
    const { setSession } = useAuth();

    return useMutation({
        mutationFn: (data: AuthRegisterData) => AuthService.register(data),
        onSuccess: (data: AuthResponse) => {
            setSession(data.user, data.accessToken);
        },
    });
};

// export const useForgotPasswordMutation = () => {
//   return useMutation({
//     mutationFn: (email: string) => AuthService.forgotPassword(email),
//   });
// };

// export const useResetPasswordMutation = () => {
//   return useMutation({
//     mutationFn: ({ token, newPassword }: any) =>
//       AuthService.resetPassword(token, newPassword),
//   });
// };
