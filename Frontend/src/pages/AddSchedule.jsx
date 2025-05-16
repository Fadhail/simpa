import { TypographyAtom } from "../components/atoms/TypographyAtom";
import { Card } from "@material-tailwind/react";
import { ScheduleForm } from "../components/organisms/ScheduleForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePlanes } from "../hooks/usePlanes";
import { useSchedules } from "../hooks/useSchedules";

export function AddSchedule() {
    const navigate = useNavigate();
    const { planes } = usePlanes();
    const { addSchedule } = useSchedules();

    const [error, setError] = useState(null);

    const handleSubmit = async (formData) => {
        try {
            await addSchedule(formData);
            navigate("/schedules");
        } catch (error) {
            console.error("Error adding schedule:", error);
            setError(error.response?.data?.message || 'Gagal menambahkan jadwal');
        }
    };

    const handleCancel = () => {
        navigate("/schedules");
    };

    return (
        <div className="p-6">
            <TypographyAtom variant="h4" className="mb-6">
                Tambah Jadwal Penerbangan
            </TypographyAtom>

            <Card className="p-6">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <p>{error}</p>
                    </div>
                )}
                <ScheduleForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    planes={planes}
                />
            </Card>
        </div>
    );
}
