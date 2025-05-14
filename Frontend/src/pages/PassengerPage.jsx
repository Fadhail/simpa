import { PassengerTable } from "../components/organisms/PassengerTable";

export function PassengerPage() {
    return (
        <div className="py-6">
            <h1 className="text-2xl font-bold mb-6">Data Penumpang</h1>
            <PassengerTable />
        </div>
    );
}