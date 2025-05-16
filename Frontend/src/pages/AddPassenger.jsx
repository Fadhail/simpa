import { TypographyAtom } from "../components/atoms/TypographyAtom";
import { Card } from "@material-tailwind/react";
import { PassengerForm } from "../components/organisms/PassengerForm";
import { useNavigate } from "react-router-dom";
import { usePassengers } from "../hooks/usePassengers";

export function AddPassenger() {
    const navigate = useNavigate();
    const { addPassenger } = usePassengers();

    const handleSubmit = async (formData) => {
        try {
            await addPassenger(formData);
            navigate("/passengers");
        } catch (error) {
            console.error("Error adding passenger:", error);
        }
    };

    const handleCancel = () => {
        navigate("/passengers");
    };

    return (
        <div className="p-6">
            <TypographyAtom variant="h4" className="mb-6">
                Tambah Penumpang
            </TypographyAtom>

            <Card className="p-6">
                <PassengerForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </Card>
        </div>
    );
}
