import { SidebarOpen } from "lucide-react";
import { useSidebar } from "../hooks/useSidebar";

export default function ChatHeader({ title }) {
    const { isSidebarOpen, toggleSidebar } = useSidebar();

    return (
        <header className="h-16 flex justify-start gap-4 items-center p-4 bg-gray-100 border-b border-gray-200">
            {
                isSidebarOpen && (
                    <button
                        className="p-2 rounded hover:bg-gray-200 cursor-pointer"
                        title="Open Sidebar"
                        onClick={toggleSidebar}
                    >
                        <SidebarOpen size={24} />
                    </button>
                )
            }
            <h1 className="text-2xl font-bold capitalize">{title}</h1>
        </header>
    );
}