import { TypographyAtom } from "../atoms/TypographyAtom";
import { Bars3Icon } from "@heroicons/react/24/solid";

export function Navbar({ onMenuClick, sidebarOpen, isDesktop }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white shadow-md flex items-center transition-all duration-300">
            {/* Tombol hamburger di mobile */}
            {!isDesktop && (
                <button onClick={onMenuClick} className="ml-4 md:hidden">
                    <Bars3Icon className="h-6 w-6 text-blue-gray-900" />
                </button>
            )}

            {/* Container Welcome */}
            <div
                className={`flex items-center h-full transition-all duration-300 ${isDesktop && sidebarOpen ? "ml-64 pl-6" : "ml-4"
                    }`}
            >
                <TypographyAtom variant="h6" className="text-blue-gray-900">
                    SIMPA Dashboard
                </TypographyAtom>
            </div>
        </header>
    );
}