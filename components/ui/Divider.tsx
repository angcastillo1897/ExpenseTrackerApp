import React from "react";
import { View, ViewProps } from "react-native";

export interface DividerProps extends ViewProps {
    /** Divider orientation */
    orientation?: "horizontal" | "vertical";
    /** Divider thickness */
    thickness?: number;
}

export function Divider({
    orientation = "horizontal",
    thickness = 1,
    className = "",
    ...props
}: DividerProps) {
    return (
        <View
            className={`
                bg-divider
                ${orientation === "horizontal" ? "w-full" : "h-full"}
                ${className}
            `}
            style={{
                [orientation === "horizontal" ? "height" : "width"]: thickness,
            }}
            {...props}
        />
    );
}
