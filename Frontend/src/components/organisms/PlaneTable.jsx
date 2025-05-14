import { Card } from "@material-tailwind/react";
import { ButtonAtom } from "../atoms/ButtonAtom";
import { TypographyAtom } from "../atoms/TypographyAtom";
import { usePlanes } from "../../hooks/usePlanes";
import {
    PencilIcon,
    TrashIcon
} from "@heroicons/react/24/solid";

const TABLE_HEAD = ["Kode Pesawat", "Nama Maskapai", "Tipe Pesawat", "Kapasitas", "Tahun Produksi", "Status", "Aksi"];

export function PlaneTable() {
    const { planes, loading, error, retry } = usePlanes();

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
                    Gagal mengambil data pesawat
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
                    {planes.map((pln) => (
                        <tr key={pln.id} className="even:bg-blue-gray-50/50 align-top">
                            <td className="p-4">{pln.kodePesawat}</td>
                            <td className="p-4">{pln.namaMaskapai}</td>
                            <td className="p-4">{pln.tipePesawat}</td>
                            <td className="p-4">{pln.kapasitas}</td>
                            <td className="p-4">{pln.tahunProduksi}</td>
                            <td className="p-4">
                                <div className={`inline-block px-2 py-1 rounded text-white text-sm ${pln.status === "Aktif"
                                    ? "bg-green-500 opacity-80"
                                    : pln.status === "Perawatan"
                                        ? "bg-gray-500 opacity-80"
                                        : pln.status === "Nonaktif"
                                            ? "bg-red-500 opacity-80"
                                            : "bg-white-500 opacity-80"
                                    }`}>
                                    {pln.status}
                                </div>
                            </td>
                            <td className="p-4">
                                <ButtonAtom color="green" size="sm">
                                    <PencilIcon className="h-5 w-5" />
                                </ButtonAtom>
                                <ButtonAtom color="red" size="sm">
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