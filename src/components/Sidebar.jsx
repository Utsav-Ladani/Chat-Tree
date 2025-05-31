import { Link, NavLink } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { Settings } from "lucide-react";
import { useState } from "react";
import SettingsModal from "./SettingsModal";
import { SidebarOpen } from "lucide-react";
import { SidebarClose } from "lucide-react";
import { useSidebar } from "../hooks/useSidebar";
import { PenBox } from "lucide-react";
import ModelSelection from "./ModelSelection";

export default function Sidebar({ chatRootNodes, onNewChat, onDeleteNode }) {

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { isSidebarOpen, toggleSidebar } = useSidebar();

    return (
        <aside className={`flex flex-col bg-gray-100 p-1 border-r border-gray-200 h-screen transition-w duration-300 ${isSidebarOpen ? "w-16 items-center" : "w-72"}`}>
            <div className="h-16 flex justify-between items-center mb-4 px-2 py-2">
                <Link to="/">
                    <h1 className="text-2xl font-bold truncate">
                        {isSidebarOpen ? '🌳' : '🌳 Chat Trees'}
                    </h1>
                </Link>
                {
                    !isSidebarOpen && (
                        <button
                            className="p-2 rounded hover:bg-gray-200 cursor-pointer"
                            title={isSidebarOpen ? "Open Sidebar" : "Close Sidebar"}
                            onClick={toggleSidebar}
                        >
                            {isSidebarOpen ? <SidebarOpen size={24} /> : <SidebarClose size={24} />}
                        </button>
                    )
                }

            </div>
            <nav className="flex flex-col gap-1 overflow-y-auto px-2 h-full">
                <button
                    className="h-10 flex items-center justify-center bg-gray-200 text-black p-2 mb-4 rounded border border-gray-300 cursor-pointer hover:bg-gray-300 hover:text-black"
                    onClick={onNewChat}
                >
                    <PenBox size={20} />
                    {!isSidebarOpen && <span className="ml-2 truncate">New Chat</span>}
                </button>
                {!isSidebarOpen && chatRootNodes.map((node) => (
                    <NavLink
                        key={node.id}
                        to={`/chat/${node.id}`}
                        className={({ isActive }) =>
                            `flex items-center justify-between px-2 py-1 rounded capitalize transition-colors duration-150 cursor-pointer mb-1 ${isActive ? "bg-black text-white" : "hover:bg-gray-200 bg-transparent text-black"
                            }`
                        }
                        title={node.title || 'Untitled'}
                    >
                        <span className="truncate mr-2">{node.title || 'Untitled'}</span>
                        <button
                            className="ml-2 text-red-500 bg-red-100 text-red-700 hover:bg-red-200 rounded-full p-1 border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                            title="Delete chat"
                            onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                onDeleteNode(node.id);
                            }}
                        >
                            <Trash2 size={16} />
                        </button>
                    </NavLink>
                ))}
            </nav>
            {!isSidebarOpen && <ModelSelection />}
            <button
                className="h-10 flex items-center justify-center bg-gray-200 text-black p-2 mb-2 mx-2 rounded border border-gray-300 hover:bg-gray-300 hover:text-black hover:cursor-pointer"
                title="Settings"
                onClick={() => {
                    setIsSettingsOpen(true);
                }}
            >
                <Settings size={20} />
                {!isSidebarOpen && <span className="ml-2 truncate">Change Model</span>}
            </button>
            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </aside>
    )
}