import { formatCurrency } from "../../utils/formatUtils";
import { useTicket } from "../../hooks/useTicket";
import { usePassengers } from "../../hooks/usePassengers";
import { useSchedules } from "../../hooks/useSchedules";

export function TicketList() {
    const { tickets, loading, error, retry } = useTicket();
    const { passengers } = usePassengers();
    const { schedules } = useSchedules();
    
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-gray-600 text-lg">
                    Loading...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-64 space-y-4">
                <div className="text-red-600 text-lg">
                    Gagal mengambil data tiket
                </div>
                <button 
                    onClick={retry}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Coba Lagi
                </button>
            </div>
        );
    }
    
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-3">Kode Tiket</th>
                            <th className="text-left py-3">Nama Penumpang</th>
                            <th className="text-left py-3">Harga</th>
                            <th className="text-left py-3">Kode Penerbangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.slice(tickets.length - 5).map((tkt) => (
                            <tr key={tkt.id} className="border-b">
                                <td className="py-3">{tkt.kodeTiket}</td>
                                <td className="py-3">{passengers?.find((psg) => psg.id === tkt.passengerId)?.namaLengkap || "Unknown"}</td>
                                <td className="py-3">{formatCurrency(tkt.harga)}</td>
                                <td className="py-3">{schedules?.find((sdl) => sdl.id === tkt.scheduleId)?.kodePenerbangan || "Unknown"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
