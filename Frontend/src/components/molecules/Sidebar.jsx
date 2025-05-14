import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from "@material-tailwind/react";
import {
    HomeIcon,
    UsersIcon,
    RocketLaunchIcon,
    CalendarIcon,
    TicketIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";

export function Sidebar({ open, onLinkClick }) {
    const location = useLocation();

    const menus = [
        { name: "Home", path: "/", icon: HomeIcon },
        { name: "Penumpang", path: "/passengers", icon: UsersIcon },
        { name: "Pesawat", path: "/planes", icon: RocketLaunchIcon },
        { name: "Jadwal", path: "/schedules", icon: CalendarIcon },
        { name: "Tiket", path: "/tickets", icon: TicketIcon },
    ];

    return (
        <aside
            className={`fixed top-0 left-0 z-50 h-screen bg-blue-gray-900 shadow-md transform ${open ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 w-64`}
        >
            <Card className="h-full p-4 bg-blue-gray-900">
                <div className="mb-6 flex justify-center">
                    <Typography variant="h5" color="white">
                        Dashboard
                    </Typography>
                </div>
                <List>
                    {menus.map((menu, idx) => {
                        const Icon = menu.icon;
                        const active = location.pathname === menu.path;

                        return (
                            <Link
                                to={menu.path}
                                key={idx}
                                onClick={() => {
                                    if (onLinkClick) onLinkClick();
                                }}
                            >
                                <ListItem
                                    className={`text-white ${active ? "bg-blue-700" : "hover:bg-orange-500"}`}
                                >
                                    <ListItemPrefix>
                                        <Icon className="h-5 w-5 text-white" />
                                    </ListItemPrefix>
                                    {menu.name}
                                </ListItem>
                            </Link>
                        );
                    })}
                </List>
            </Card>
        </aside>
    );
}