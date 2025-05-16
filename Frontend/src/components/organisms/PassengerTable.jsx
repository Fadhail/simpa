import { Card } from "@material-tailwind/react";
import { ButtonAtom } from "../atoms/ButtonAtom";
import { TypographyAtom } from "../atoms/TypographyAtom";
import { usePassengers } from "../../hooks/usePassengers";
import { Link } from "react-router-dom";
import {
    PencilIcon,
    TrashIcon
} from "@heroicons/react/24/solid";

const TABLE_HEAD = ["NIK", "Nama", "Jenis Kelamin", "Tanggal Lahir", "Alamat", "Email", "No Telepon", "Aksi"];

export function PassengerTable() {
    const { passengers, loading, error, retry, deletePassenger } = usePassengers();

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
                    Gagal mengambil data penumpang
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
                <Link to="/passengers/add">
                    <ButtonAtom color="blue" size="sm">
                        Tambah Penumpang
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
                    {passengers.map((psg) => (
                        <tr key={psg.nik} className="even:bg-blue-gray-50/50 align-top">
                            <td className="p-4">{psg.nik}</td>
                            <td className="p-4">{psg.namaLengkap.namaDepan + ' ' + psg.namaLengkap.namaBelakang}</td>
                            <td className="p-4">{psg.jenisKelamin}</td>
                            <td className="p-4">{psg.tanggalLahir}</td>
                            <td className="p-4">
                                {psg.alamat.jalan}, {psg.alamat.kelurahan}, {psg.alamat.kota}
                            </td>
                            <td className="p-4">{psg.email}</td>
                            <td className="p-4">{psg.telepon}</td>
                            <td className="p-4">
                            <Link to={`/passengers/edit/${psg.nik}`} className="text-blue-500 hover:text-blue-700 mr-2">
                                    <PencilIcon className="h-5 w-5" />
                            </Link>
                            <TrashIcon onClick={() => {if (window.confirm("Yakin ingin menghapus penumpang ini?")) {deletePassenger(psg.nik);}}} className="h-5 w-5" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
}