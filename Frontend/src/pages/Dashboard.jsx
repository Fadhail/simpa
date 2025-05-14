import { TypographyAtom } from "../components/atoms/TypographyAtom";

export function Dashboard() {
    return (
        <div className="p-6">
            <TypographyAtom variant="h4" className="mb-6">
                Dashboard Home
            </TypographyAtom>
            <TypographyAtom variant="paragraph">
                Ini halaman dashboard utama.
            </TypographyAtom>
        </div>
    );
}