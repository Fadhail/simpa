import { Card } from "@material-tailwind/react";
import { ButtonAtom } from "../atoms/ButtonAtom";
import { TypographyAtom } from "../atoms/TypographyAtom";
import { useSchedules } from "../../hooks/useSchedules";
import { usePlanes } from "../../hooks/usePlanes";
import {
    PencilIcon,
    TrashIcon
} from "@heroicons/react/24/solid";

const TABLE_HEAD = ["Kode Penerbangan", "Nama Maskapai", "Asal", "Tujuan", "Waktu Berangkat", "Waktu Tiba", "Status", "Harga Tiket", "Aksi"];

export function ScheduleTable() {
    const { schedules, loading, error, retry, deleteSchedule } = useSchedules();
    const { planes } = usePlanes();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <TypographyAtom variant="h6" color="gray">
                    Loading...
                </TypographyAtom>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-64 space-y-4">
                <TypographyAtom variant="h6" color="red">
                    Gagal mengambil data jadwal
                </TypographyAtom>
                <ButtonAtom color="red" onClick={retry}>
                    Coba Lagi
                </ButtonAtom>
            </div>
        );
    }

    return (
        <Card className="h-full w-full overflow-auto p-6">
            <div className="flex justify-end p-4">
                <ButtonAtom color="blue">
                    Tambah Data
                </ButtonAtom>
            </div>

            <table className="w-full table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <TypographyAtom
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </TypographyAtom>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((sdl) => (
                        <tr key={sdl.id} className="even:bg-blue-gray-50/50 align-top">
                            <td className="p-4">{sdl.kodePenerbangan}</td>
                            {/* Menggunakan Collection Planes */}
                            <td className="p-4">
                                {planes?.find((pln) => pln.id === sdl.planeId)?.namaMaskapai || "Unknown"}
                            </td>
                            <td className="p-4">{sdl.asal}</td>
                            <td className="p-4">{sdl.tujuan}</td>
                            <td className="p-4">{new Date(sdl.waktuBerangkat).toLocaleString()}</td>
                            <td className="p-4">{new Date(sdl.waktuTiba).toLocaleString()}</td>
                            <td className="p-4">
                                <div className={`inline-block px-2 py-1 rounded text-white text-sm ${sdl.status === "Terjadwal"
                                    ? "bg-green-500 opacity-80"
                                    : sdl.status === "Delay"
                                        ? "bg-gray-500 opacity-80"
                                        : sdl.status === "Dibatalkan"
                                            ? "bg-red-500 opacity-80"
                                            : sdl.status === "Selesai"
                                                ? "bg-blue-500 opacity-80"
                                                : "bg-white-500 opacity-80"
                                    }`}>
                                    {sdl.status}
                                </div>
                            </td>
                            <td className="p-4">Rp{sdl.hargaTiket}</td>
                            <td className="p-4">
                                <ButtonAtom color="green" size="sm">
                                    <PencilIcon className="h-5 w-5" />
                                </ButtonAtom>
                                <ButtonAtom color="red" size="sm" 
                                        onClick={() => {
                                            if (window.confirm("Yakin ingin menghapus jadwal ini?")) {
                                            deleteSchedule(sdl.kodePenerbangan);
                                            }
                                        }}>
                                    <TrashIcon className="h-5 w-5" />
                                </ButtonAtom>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
}