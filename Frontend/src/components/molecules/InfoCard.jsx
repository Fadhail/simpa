import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";

export function InfoCard({ title, value }) {
    return (
        <Card className="h-full">
                <div className="flex flex-col items-center justify-center h-24">
                    <Typography variant="h4" className="text-2xl font-bold">
                        {value}
                    </Typography>
                    <div className="mt-2">
                        <Typography variant="h6" className="text-gray-600">
                            {title}
                        </Typography>
                    </div>
                </div>
        </Card>
    );
}
