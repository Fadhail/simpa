import { TypographyAtom } from "../components/atoms/TypographyAtom";
import { Card } from "@material-tailwind/react";
import { PassengerForm } from "../components/organisms/PassengerForm";
import { useNavigate, useParams } from "react-router-dom";
import { usePassengers } from "../hooks/usePassengers";

export function EditPassenger() {
    const navigate = useNavigate();
    const { nik } = useParams();
    const { passengers, updatePassenger, loading } = usePassengers();

    if (loading) {
        return (
            <div className="p-6 flex justify-center items-center min-h-[200px]">
                <TypographyAtom variant="h5">Memuat data...</TypographyAtom>
            </div>
        );
    }

    const passenger = passengers.find(p => p.nik === nik);

    const handleSubmit = async (formData) => {
        try {
            await updatePassenger(nik, formData);
            navigate("/passengers");
        } catch (error) {
            console.error("Error updating passenger:", error);
        }
    };

    const handleCancel = () => {
        navigate("/passengers");
    };

    if (!passenger) {
        return (
            <div className="p-6">
                <TypographyAtom variant="h4" className="mb-6">
                    Penumpang tidak ditemukan
                </TypographyAtom>
            </div>
        );
    }

    return (
        <div className="p-6">
            <TypographyAtom variant="h4" className="mb-6">
                Edit Penumpang
            </TypographyAtom>

            <Card className="p-6">
                <PassengerForm
                    initialValues={passenger}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isEditing={true}
                />
            </Card>
        </div>
    );
}
