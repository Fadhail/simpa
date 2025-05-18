import { TypographyAtom } from "../components/atoms/TypographyAtom";
import { Card } from "@material-tailwind/react";
import { PlaneForm } from "../components/organisms/PlaneForm";
import { useNavigate, useParams } from "react-router-dom";
import { usePlanes } from "../hooks/usePlanes";

export function EditPlane() {
    const navigate = useNavigate();
    const { kodePesawat } = useParams();
    const { planes, updatePlane, loading } = usePlanes();
    const plane = planes.find(p => p.kodePesawat === kodePesawat);

    if (loading) {
        return (
            <div className="p-6 flex justify-center items-center min-h-[200px]">
                <TypographyAtom variant="h5">Memuat data...</TypographyAtom>
            </div>
        );
    }

    const handleSubmit = async (formData) => {
        try {
            await updatePlane(kodePesawat, formData);
            navigate("/planes");
        } catch (error) {
            console.error("Error updating plane:", error);
        }
    }

    const handleCancel = () => {
        navigate("/planes");
    }

    if (!plane) {
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
                    initialValues={plane}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isEditing={true}
                />
            </Card>
        </div>
    );
}
