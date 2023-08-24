import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import React from "react";

export default function Sidebar() {
    return (
        <aside
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidenav"
            id="drawer-navigation"
        >
            <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
                <ul className="space-y-2">
                    <li>
                        <ResponsiveNavLink
                            className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                            href={route("dataset.index")}
                        >
                            <span className="ml-3">Dashboard</span>
                        </ResponsiveNavLink>
                    </li>
                    <li>
                        <ResponsiveNavLink
                            className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                            href={route("dataset.index")}
                        >
                            <span className="ml-3">Dataset</span>
                        </ResponsiveNavLink>
                    </li>
                    <li>
                        <ResponsiveNavLink
                            className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                            href={route("knn.show")}
                        >
                            <span className="ml-3">KNN Prediksi</span>
                        </ResponsiveNavLink>
                    </li>
                    <li>
                        <ResponsiveNavLink
                            className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                            href={route("train.train")}
                        >
                            <span className="ml-3 text-white">
                                Processing Data
                            </span>
                        </ResponsiveNavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
