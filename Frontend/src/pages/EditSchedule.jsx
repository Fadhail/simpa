import { TypographyAtom } from "../components/atoms/TypographyAtom";
import { Card } from "@material-tailwind/react";
import { ScheduleForm } from "../components/organisms/ScheduleForm";
import { useNavigate, useParams } from "react-router-dom";
import { useSchedules } from "../hooks/useSchedules";
import { usePlanes } from "../hooks/usePlanes";

export function EditSchedule() {
    const navigate = useNavigate();
    const { kodePenerbangan } = useParams();
    const { schedules, updateSchedule } = useSchedules();
    const { planes } = usePlanes();

    // Find the schedule to edit
    const schedule = schedules.find(s => s.kodePenerbangan === kodePenerbangan);

    const handleSubmit = async (formData) => {
        try {
            await updateSchedule(kodePenerbangan, formData);
            navigate("/schedules");
        } catch (error) {
            console.error("Error updating schedule:", error);
        }
    };

    const handleCancel = () => {
        navigate("/schedules");
    };

    if (!schedule) {
        return (
            <div className="p-6">
                <TypographyAtom variant="h4" className="mb-6">
                    Jadwal tidak ditemukan
                </TypographyAtom>
            </div>
        );
    }

    return (
        <div className="p-6">
            <TypographyAtom variant="h4" className="mb-6">
                Edit Jadwal Penerbangan
            </TypographyAtom>

            <Card className="p-6">
                <ScheduleForm
                    initialValues={schedule}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isEditing={true}
                    planes={planes}
                />
            </Card>
        </div>
    );
}
