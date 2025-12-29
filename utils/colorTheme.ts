import { vars } from "nativewind";

export const themes = {
  light: vars({
    // Primary colors
    "--color-primary": "#3B82F6",           // blue-500
    "--color-primary-dark": "#2563EB",      // blue-600
    "--color-primary-light": "#60A5FA",     // blue-400
    
    // Background colors
    "--color-background": "#FFFFFF",        // white
    "--color-surface": "#F9FAFB",           // gray-50
    "--color-card": "#FFFFFF",              // white
    
    // Text colors
    "--color-text": "#111827",              // gray-900
    "--color-text-secondary": "#6B7280",    // gray-500
    "--color-text-muted": "#9CA3AF",        // gray-400
    
    // Border & divider colors
    "--color-border": "#E5E7EB",            // gray-200
    "--color-divider": "#F3F4F6",           // gray-100
    
    // Semantic colors
    "--color-success": "#10B981",           // green-500
    "--color-error": "#EF4444",             // red-500
    "--color-warning": "#F59E0B",           // amber-500
    "--color-info": "#3B82F6",              // blue-500
    
    // Input colors
    "--color-input-bg": "#FFFFFF",
    "--color-input-border": "#D1D5DB",      // gray-300
    "--color-input-focus": "#3B82F6",       // blue-500
    "--color-placeholder": "#9CA3AF",       // gray-400
  }),
  dark: vars({
    // Primary colors
    "--color-primary": "#60A5FA",           // blue-400
    "--color-primary-dark": "#3B82F6",      // blue-500
    "--color-primary-light": "#93C5FD",     // blue-300
    
    // Background colors
    "--color-background": "#111827",        // gray-900
    "--color-surface": "#1F2937",           // gray-800
    "--color-card": "#1F2937",              // gray-800
    
    // Text colors
    "--color-text": "#F3F4F6",              // gray-100
    "--color-text-secondary": "#9CA3AF",    // gray-400
    "--color-text-muted": "#6B7280",        // gray-500
    
    // Border & divider colors
    "--color-border": "#374151",            // gray-700
    "--color-divider": "#1F2937",           // gray-800
    
    // Semantic colors
    "--color-success": "#34D399",           // green-400
    "--color-error": "#F87171",             // red-400
    "--color-warning": "#FBBF24",           // amber-400
    "--color-info": "#60A5FA",              // blue-400
    
    // Input colors
    "--color-input-bg": "#1F2937",          // gray-800
    "--color-input-border": "#4B5563",      // gray-600
    "--color-input-focus": "#60A5FA",       // blue-400
    "--color-placeholder": "#6B7280",       // gray-500
  }),
};