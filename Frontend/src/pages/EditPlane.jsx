import { TypographyAtom } from "../components/atoms/TypographyAtom";
import { Card } from "@material-tailwind/react";
import { PlaneForm } from "../components/organisms/PlaneForm";
import { useNavigate, useParams } from "react-router-dom";
import { usePlanes } from "../hooks/usePlanes";

export function EditPlane() {
    const navigate = useNavigate();
    const { kodePesawat } = useParams();
    const { planes } = usePlanes();

    // Find the plane to edit
    const planeToEdit = planes.find(p => p.kodePesawat === kodePesawat);

    const { updatePlane } = usePlanes();

    const handleSubmit = async (formData) => {
        try {
            await updatePlane(kodePesawat, formData);
            navigate("/planes");
        } catch (error) {
            console.error("Error updating plane:", error);
        }
    };

    const handleCancel = () => {
        navigate("/planes");
    };

    if (!planeToEdit) {
        return (
            <div className="p-6">
                <TypographyAtom variant="h4" className="mb-6">
                    Pesawat tidak ditemukan
                </TypographyAtom>
            </div>
        );
    }

    return (
        <div className="p-6">
            <TypographyAtom variant="h4" className="mb-6">
                Edit Pesawat
            </TypographyAtom>

            <Card className="p-6">
                <PlaneForm
                    initialValues={planeToEdit}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isEditing={true}
                />
            </Card>
        </div>
    );
}
