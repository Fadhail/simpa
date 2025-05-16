import { TypographyAtom } from "../atoms/TypographyAtom";

export function Footer() {
    return (
        <footer className="w-full bg-white shadow-md h-12 flex items-center justify-center mt-10">
            <TypographyAtom variant="small" color="gray">
                © 2025 SIMPA. All rights reserved.
            </TypographyAtom>
        </footer>
    );
}