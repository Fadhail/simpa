import { Sidebar } from "../molecules/Sidebar";
import { Navbar } from "../molecules/Navbar";
import { Footer } from "../molecules/Footer";
import { useState, useEffect } from "react";

export function LayoutDashboard({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        if (!isDesktop) {
            setSidebarOpen(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
            if (window.innerWidth >= 768) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="relative flex flex-col min-h-screen bg-blue-gray-100">
            {/* Navbar */}
            <Navbar
                onMenuClick={toggleSidebar}
                sidebarOpen={sidebarOpen}
                isDesktop={isDesktop}
            />

            {/* Content Area */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar open={sidebarOpen} onLinkClick={closeSidebar} />

                {/* Backdrop */}
                {sidebarOpen && !isDesktop && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30"
                        onClick={closeSidebar}
                    ></div>
                )}

                {/* Main */}
                <main
                    className={`flex-1 pt-20 px-6 transition-all duration-300 ${isDesktop && sidebarOpen ? "ml-64" : ""
                        }`}
                >
                    {children}
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}