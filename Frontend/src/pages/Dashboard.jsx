import { TypographyAtom } from "../components/atoms/TypographyAtom";
import { InfoCard } from "../components/molecules/InfoCard";
import { RecentActivity } from "../components/organisms/RecentActivity";
import { Card } from "@material-tailwind/react";
import { usePassengers } from "../hooks/usePassengers";
import { usePlanes } from "../hooks/usePlanes";
import { useSchedules } from "../hooks/useSchedules";
import { useTicket } from "../hooks/useTicket";

export function Dashboard() {
    const { passengers } = usePassengers();
    const { planes } = usePlanes();
    const { schedules } = useSchedules();
    const { tickets } = useTicket();
    const stats = {
        totalPassengers: passengers.length,
        totalPlanes: planes.length,
        activeSchedules: schedules.length,
        ticketsSold: tickets.length
    };

    return (
        <div className="p-6">
            <TypographyAtom variant="h4" className="mb-6">
                Dashboard
            </TypographyAtom>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <InfoCard 
                    title="Total Penumpang" 
                    value={stats.totalPassengers.toLocaleString()}
                />
                <InfoCard 
                    title="Total Pesawat" 
                    value={stats.totalPlanes}
                />
                <InfoCard 
                    title="Jadwal Aktif" 
                    value={stats.activeSchedules}
                />
                <InfoCard 
                    title="Tiket Terjual" 
                    value={stats.ticketsSold.toLocaleString()}
                />
            </div>

            {/* Recent Activity */}
            <RecentActivity />
        </div>
    );
}