/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./providers/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                // Primary colors
                primary: "var(--color-primary)",
                "primary-dark": "var(--color-primary-dark)",
                "primary-light": "var(--color-primary-light)",

                // Background colors
                background: "var(--color-background)",
                surface: "var(--color-surface)",
                card: "var(--color-card)",

                // Text colors
                text: "var(--color-text)",
                "text-secondary": "var(--color-text-secondary)",
                "text-muted": "var(--color-text-muted)",

                // Border & divider colors
                border: "var(--color-border)",
                divider: "var(--color-divider)",

                // Semantic colors
                success: "var(--color-success)",
                error: "var(--color-error)",
                warning: "var(--color-warning)",
                info: "var(--color-info)",

                // Input colors
                "input-bg": "var(--color-input-bg)",
                "input-border": "var(--color-input-border)",
                "input-focus": "var(--color-input-focus)",
                placeholder: "var(--color-placeholder)",
            },
        },
    },
    plugins: [],
};
