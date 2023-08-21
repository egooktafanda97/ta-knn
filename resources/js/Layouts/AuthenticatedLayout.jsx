import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="antialiased min-h-screen bg-gray-100">
            <TopNav />
            <Sidebar />
            <main className="p-4 md:ml-64 h-auto pt-20">{children}</main>
        </div>
    );
}
