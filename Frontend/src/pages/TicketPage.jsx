import { TicketTable } from "../components/organisms/TicketTable";

export function TicketPage() {
    return (
        <div className="py-6">
            <h1 className="text-2xl font-bold mb-6">Data Tiket</h1>
            <TicketTable />
        </div>
    );
}