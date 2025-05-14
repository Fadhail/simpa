import { ScheduleTable } from "../components/organisms/ScheduleTable";

export function SchedulePage() {
    return (
        <div className="py-6">
            <h1 className="text-2xl font-bold mb-6">Data Jadwal</h1>
            <ScheduleTable />
        </div>
    );
}