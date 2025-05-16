import { Badge } from "@material-tailwind/react";

export function StatusBadge({ status }) {
    const statusColors = {
        terjadwal: "blue",
        delay: "yellow",
        dibatalkan: "pink"
    };

    return (
        <Badge 
            color={statusColors[status] || "gray"}
            className="text-xs"
        >
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    );
}
