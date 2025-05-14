import { Button } from "@material-tailwind/react";

export function ButtonAtom({ children, onClick, color = "blue", className = "" }) {
    return (
        <Button color={color} className={className} onClick={onClick}>
            {children}
        </Button>
    );
}