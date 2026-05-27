import { Alert } from "@/components/ui";
import React, { createContext, useCallback, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertState {
    visible: boolean;
    title?: string;
    message: string;
    variant: AlertVariant;
}

interface AlertContextType {
    showAlert: (message: string, variant: AlertVariant, title?: string) => void;
    hideAlert: () => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(
    undefined,
);

export function AlertProvider({ children }: { children: React.ReactNode }) {
    const insets = useSafeAreaInsets();
    const [alert, setAlert] = useState<AlertState>({
        visible: false,
        message: "",
        variant: "info",
    });

    const showAlert = useCallback(
        (message: string, variant: AlertVariant = "info", title?: string) => {
            setAlert({
                visible: true,
                message,
                variant,
                title,
            });
            // Auto-hide after 4 seconds
            const timer = setTimeout(() => {
                setAlert((prev) => ({ ...prev, visible: false }));
            }, 4000);

            return () => clearTimeout(timer);
        },
        [],
    );

    const hideAlert = useCallback(() => {
        setAlert((prev) => ({ ...prev, visible: false }));
    }, []);

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {children}
            {alert.visible && (
                <View
                    className="absolute left-0 right-0 z-50 p-4"
                    style={{ bottom: insets.bottom + 80 }}
                >
                    <Alert
                        title={alert.title}
                        message={alert.message}
                        variant={alert.variant}
                    />
                </View>
            )}
        </AlertContext.Provider>
    );
}

// Custom hook to use alerts
export function useAlert() {
    const context = React.useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within AlertProvider");
    }

    return {
        info: (message: string, title?: string) =>
            context.showAlert(message, "info", title),
        success: (message: string, title?: string) =>
            context.showAlert(message, "success", title),
        warning: (message: string, title?: string) =>
            context.showAlert(message, "warning", title),
        error: (message: string, title?: string) =>
            context.showAlert(message, "error", title),
        hide: context.hideAlert,
    };
}
