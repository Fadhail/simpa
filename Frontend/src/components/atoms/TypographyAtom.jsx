import { Typography } from "@material-tailwind/react";

export function TypographyAtom({ children, variant = "paragraph", color = "blue-gray", className = "" }) {
    return (
        <Typography variant={variant} color={color} className={className}>
            {children}
        </Typography>
    );
}