import { useState } from "react";
import { TypographyAtom } from "../components/atoms/TypographyAtom";
import { Card } from "@material-tailwind/react";
import { PlaneForm } from "../components/organisms/PlaneForm";
import { useNavigate } from "react-router-dom";
import { usePlanes } from "../hooks/usePlanes";

export function AddPlane() {
    const navigate = useNavigate();
    const { addPlane } = usePlanes();
    const [error] = useState(null);

    const handleSubmit = async (formData) => {
        try {
            await addPlane(formData);
            navigate("/planes");
        } catch (error) {
            console.error("Error updating plane:", error);
        }
    };

    const handleCancel = () => {
        navigate("/planes");
    };

    return (
        <div className="p-6">
            <TypographyAtom variant="h4" className="mb-6">
                Tambah Pesawat
            </TypographyAtom>

            <Card className="p-6">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <p>{error}</p>
                    </div>
                )}
                <PlaneForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </Card>
        </div>
    );
}
