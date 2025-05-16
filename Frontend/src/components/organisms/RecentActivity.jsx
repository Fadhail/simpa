import { Typography } from "@material-tailwind/react";
import { FlightList } from "./FlightList";
import { TicketList } from "./TicketList";

export function RecentActivity() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <Typography variant="h5" className="mb-4">
                    Penerbangan Terbaru
                </Typography>
                <FlightList />
            </div>
            <div>
                <Typography variant="h5" className="mb-4">
                    Tiket Terjual Terbaru
                </Typography>
                <TicketList />
            </div>
        </div>
    );
}
