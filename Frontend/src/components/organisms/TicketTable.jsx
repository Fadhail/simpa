import { Card } from "@material-tailwind/react";
import { ButtonAtom } from "../atoms/ButtonAtom";
import { TypographyAtom } from "../atoms/TypographyAtom";
import { useTickets } from "../../hooks/useTickets";
import { usePassengers } from "../../hooks/usePassengers";
import { useSchedules } from "../../hooks/useSchedules";
import { Link } from "react-router-dom";
import {
    PencilIcon,
    TrashIcon
} from "@heroicons/react/24/solid";

const TABLE_HEAD = ["Kode Tiket", "Pemilik Tiket", "Kode Penerbangan", "Nomor Kursi", "Tanggal Pembelian", "Masa Aktif", "Harga", "Status", "Aksi"];

export function TicketTable() {
    const { tickets, loading, error, retry, deleteTicket} = useTickets();
    const { passengers } = usePassengers();
    const { schedules } = useSchedules();

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
                    Gagal mengambil data tiket
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
                <Link to="/tickets/add">
                    <ButtonAtom color="blue" size="sm">
                        Tambah Tiket
                    </ButtonAtom>
                </Link> 
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
                    {tickets.map((tkt) => (
                        <tr key={tkt.id} className="even:bg-blue-gray-50/50 align-top">
                            <td className="p-4">{tkt.kodeTiket}</td>
                            {/* Menggunakan Collection Passenger */}
                            <td className="p-4">
                                {(() => {
                                    const passenger = passengers?.find((psg) => psg.id === tkt.passengerId);
                                    return passenger
                                        ? `${passenger.namaLengkap.namaDepan} ${passenger.namaLengkap.namaBelakang}`
                                        : "Unknown";
                                })()}
                            </td>
                            {/* Menggunakan Collection Schedules */}
                            <td className="p-4">
                                {schedules?.find((sdl) => sdl.id === tkt.scheduleId)?.kodePenerbangan || "Unknown"}
                            </td>
                            <td className="p-4">{tkt.nomorKursi}</td>
                            <td className="p-4">{new Date(tkt.tanggalPembelian).toLocaleString()}</td>
                            <td className="p-4">{new Date(tkt.masaAktif).toLocaleString()}</td>
                            <td className="p-4">Rp{tkt.harga}</td>
                            <td className="p-4">
                                <div className={`inline-block px-2 py-1 rounded text-white text-sm ${tkt.status === "Aktif"
                                    ? "bg-green-500 opacity-80"
                                    : tkt.status === "Batal"
                                        ? "bg-red-500 opacity-80"
                                        : tkt.status === "Digunakan"
                                            ? "bg-blue-500 opacity-80"
                                            : "bg-white-500 opacity-80"
                                    }`}>
                                    {tkt.status}
                                </div>
                            </td>
                            <td className="p-4">
                                <Link to={`/tickets/edit/${tkt.kodeTiket}`} className="text-blue-500 hover:text-blue-700 mr-2">
                                    <PencilIcon className="h-5 w-5" />
                                </Link> 
                                <TrashIcon onClick={() => {if (window.confirm("Yakin ingin menghapus tiket ini?")) deleteTicket(tkt.kodeTiket)}} className="h-5 w-5" /> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
}