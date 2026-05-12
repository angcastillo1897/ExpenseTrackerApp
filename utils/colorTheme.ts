import { vars } from "nativewind";

// Color values - single source of truth used by theme configuration and components
export const colorValues = {
    light: {
        primary: "#3B82F6", // blue-500
        primaryDark: "#2563EB", // blue-600
        primaryLight: "#60A5FA", // blue-400
        background: "#FFFFFF", // white
        surface: "#F9FAFB", // gray-50
        card: "#FFFFFF", // white
        text: "#111827", // gray-900
        textSecondary: "#6B7280", // gray-500
        textMuted: "#9CA3AF", // gray-400
        border: "#E5E7EB", // gray-200
        divider: "#F3F4F6", // gray-100
        success: "#10B981", // green-500
        error: "#EF4444", // red-500
        warning: "#F59E0B", // amber-500
        info: "#3B82F6", // blue-500
        inputBg: "#FFFFFF",
        inputBorder: "#D1D5DB", // gray-300
        inputFocus: "#3B82F6", // blue-500
        placeholder: "#9CA3AF", // gray-400
    },
    dark: {
        primary: "#60A5FA", // blue-400
        primaryDark: "#3B82F6", // blue-500
        primaryLight: "#93C5FD", // blue-300
        background: "#111827", // gray-900
        surface: "#1F2937", // gray-800
        card: "#1F2937", // gray-800
        text: "#F3F4F6", // gray-100
        textSecondary: "#9CA3AF", // gray-400
        textMuted: "#6B7280", // gray-500
        border: "#374151", // gray-700
        divider: "#1F2937", // gray-800
        success: "#34D399", // green-400
        error: "#F87171", // red-400
        warning: "#FBBF24", // amber-400
        info: "#60A5FA", // blue-400
        inputBg: "#1F2937", // gray-800
        inputBorder: "#4B5563", // gray-600
        inputFocus: "#60A5FA", // blue-400
        placeholder: "#6B7280", // gray-500
    },
};

export const themes = {
    light: vars({
        // Primary colors
        "--color-primary": colorValues.light.primary,
        "--color-primary-dark": colorValues.light.primaryDark,
        "--color-primary-light": colorValues.light.primaryLight,

        // Background colors
        "--color-background": colorValues.light.background,
        "--color-surface": colorValues.light.surface,
        "--color-card": colorValues.light.card,

        // Text colors
        "--color-text": colorValues.light.text,
        "--color-text-secondary": colorValues.light.textSecondary,
        "--color-text-muted": colorValues.light.textMuted,

        // Border & divider colors
        "--color-border": colorValues.light.border,
        "--color-divider": colorValues.light.divider,

        // Semantic colors
        "--color-success": colorValues.light.success,
        "--color-error": colorValues.light.error,
        "--color-warning": colorValues.light.warning,
        "--color-info": colorValues.light.info,

        // Input colors
        "--color-input-bg": colorValues.light.inputBg,
        "--color-input-border": colorValues.light.inputBorder,
        "--color-input-focus": colorValues.light.inputFocus,
        "--color-placeholder": colorValues.light.placeholder,
    }),
    dark: vars({
        // Primary colors
        "--color-primary": colorValues.dark.primary,
        "--color-primary-dark": colorValues.dark.primaryDark,
        "--color-primary-light": colorValues.dark.primaryLight,

        // Background colors
        "--color-background": colorValues.dark.background,
        "--color-surface": colorValues.dark.surface,
        "--color-card": colorValues.dark.card,

        // Text colors
        "--color-text": colorValues.dark.text,
        "--color-text-secondary": colorValues.dark.textSecondary,
        "--color-text-muted": colorValues.dark.textMuted,

        // Border & divider colors
        "--color-border": colorValues.dark.border,
        "--color-divider": colorValues.dark.divider,

        // Semantic colors
        "--color-success": colorValues.dark.success,
        "--color-error": colorValues.dark.error,
        "--color-warning": colorValues.dark.warning,
        "--color-info": colorValues.dark.info,

        // Input colors
        "--color-input-bg": colorValues.dark.inputBg,
        "--color-input-border": colorValues.dark.inputBorder,
        "--color-input-focus": colorValues.dark.inputFocus,
        "--color-placeholder": colorValues.dark.placeholder,
    }),
};
