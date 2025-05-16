import { TypographyAtom } from "../components/atoms/TypographyAtom";
import { Card } from "@material-tailwind/react";
import { TicketForm } from "../components/organisms/TicketForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTickets } from "../hooks/useTickets";
import { usePassengers } from "../hooks/usePassengers";
import { useSchedules } from "../hooks/useSchedules";

export function AddTicket() {
    const navigate = useNavigate();
    const { addTicket } = useTickets();
    const { passengers } = usePassengers();
    const { schedules } = useSchedules();

    const [error, setError] = useState(null);

    const handleSubmit = async (formData) => {
        try {
            await addTicket(formData);
            navigate("/tickets");
        } catch (error) {
            console.error("Error adding ticket:", error);
            setError(error.response?.data?.message || 'Gagal menambahkan tiket');
        }
    };

    const handleCancel = () => {
        navigate("/tickets");
    };

    return (
        <div className="p-6">
            <TypographyAtom variant="h4" className="mb-6">
                Tambah Tiket
            </TypographyAtom>

            <Card className="p-6">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <p>{error}</p>
                    </div>
                )}
                <TicketForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    passengers={passengers}
                    schedules={schedules}
                />
            </Card>
        </div>
    );
}
