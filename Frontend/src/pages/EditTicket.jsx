import { TypographyAtom } from "../components/atoms/TypographyAtom";
import { Card } from "@material-tailwind/react";
import { TicketForm } from "../components/organisms/TicketForm";
import { useNavigate, useParams } from "react-router-dom";
import { useTickets } from "../hooks/useTickets";
import { usePassengers } from "../hooks/usePassengers";
import { useSchedules } from "../hooks/useSchedules";

export function EditTicket() {
    const navigate = useNavigate();
    const { kodeTiket } = useParams();
    const { tickets, updateTicket, loading } = useTickets();
    const { passengers } = usePassengers();
    const { schedules } = useSchedules();
    const ticket = tickets.find(t => t.kodeTiket === kodeTiket);

    if (loading) {
        return (
            <div className="p-6 flex justify-center items-center min-h-[200px]">
                <TypographyAtom variant="h5">Memuat data...</TypographyAtom>
            </div>
        );
    }

    const handleSubmit = async (formData) => {
        try {
            await updateTicket(kodeTiket, formData);
            navigate("/tickets");
        } catch (error) {
            console.error("Error updating ticket:", error);
        }
    };

    const handleCancel = () => {
        navigate("/tickets");
    };

    if (!ticket) {
        return (
            <div className="p-6">
                <TypographyAtom variant="h4" className="mb-6">
                    Tiket tidak ditemukan
                </TypographyAtom>
            </div>
        );
    }

    const initialValues = {
        kodeTiket: ticket.kodeTiket,
        penumpang: {
            id: ticket.passengerId,
            nama: passengers.find(p => p.id === ticket.passengerId)?.namaDepan + " " +
                passengers.find(p => p.id === ticket.passengerId)?.namaBelakang
        },
        jadwal: {
            id: ticket.scheduleId,
            kodePenerbangan: schedules.find(s => s.id === ticket.scheduleId)?.kodePenerbangan
        },
        nomorKursi: ticket.nomorKursi,
        tanggalPembelian: ticket.tanggalPembelian,
        masaAktif: ticket.masaAktif,
        harga: ticket.harga,
        status: ticket.status
    };

    return (
        <div className="p-6">
            <TypographyAtom variant="h4" className="mb-6">
                Edit Tiket
            </TypographyAtom>

            <Card className="p-6">
                <TicketForm
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isEditing={true}
                    passengers={passengers}
                    schedules={schedules}
                />
            </Card>
        </div>
    );
}
