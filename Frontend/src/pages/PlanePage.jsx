import { PlaneTable } from "../components/organisms/PlaneTable";

export function PlanePage() {
    return (
        <div className="py-6">
            <h1 className="text-2xl font-bold mb-6">Data Pesawat</h1>
            <PlaneTable />
        </div>
    );
}