import { TypographyAtom } from "../components/atoms/TypographyAtom";
import { Card } from "@material-tailwind/react";
import { PlaneTable } from "../components/organisms/PlaneTable";
import { ButtonAtom } from "../components/atoms/ButtonAtom";
import { Link } from "react-router-dom";

export function PlanePage() {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <TypographyAtom variant="h4">
                    Data Pesawat
                </TypographyAtom>
            </div>

            <Card className="p-6">
                <PlaneTable />
            </Card>
        </div>
    );
}