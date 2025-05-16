import { StatusBadge } from "../atoms/StatusBadge";
import { useSchedules } from "../../hooks/useSchedules";

export function FlightList() {
    const { schedules, loading, error, retry } = useSchedules();
    
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
                    Gagal mengambil data penerbangan
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
                            <th className="text-left py-3">Kode Penerbangan</th>
                            <th className="text-left py-3">Rute</th>
                            <th className="text-left py-3">Waktu</th>
                            <th className="text-left py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.slice(schedules.length - 5).map((sdl) => (
                            <tr key={sdl.id} className="border-b">
                                <td className="py-3">{sdl.kodePenerbangan}</td>
                                <td className="py-3">{`${sdl.asal} → ${sdl.tujuan}`}</td>
                                <td className="py-3">{new Date(sdl.waktuBerangkat).toLocaleTimeString('id-ID', { 
                                    hour: '2-digit', 
                                    minute: '2-digit',
                                    timeZone: 'Asia/Jakarta'
                                })}</td>
                                <td className="py-3">
                                   {sdl.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
