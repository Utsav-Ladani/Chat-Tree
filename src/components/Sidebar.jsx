import { Link, NavLink } from "react-router-dom";
import { Trash2, Plus } from "lucide-react";
import { Settings } from "lucide-react";

export default function Sidebar({ chatRootNodes, onNewChat, onDeleteNode }) {
    return (
        <aside className="flex flex-col bg-gray-100 py-2 w-64 border-r border-gray-200 h-screen">
            <header className="flex justify-between items-center mb-4 px-4 py-2">
                <Link to="/">
                    <h2 className="text-2xl font-bold">Chat Trees 🌳</h2>
                </Link>
                <button
                    className="bg-black text-white p-1 rounded border border-gray-300 hover:bg-gray-200 hover:text-black hover:cursor-pointer"
                    onClick={onNewChat}
                >
                    <Plus className="size-5" />
                </button>
            </header>
            <nav className="flex flex-col gap-1 overflow-y-auto px-2 h-full">
                {chatRootNodes.map((node) => (
                    <NavLink
                        key={node.id}
                        to={`/chat/${node.id}`}
                        className={({ isActive }) =>
                            `flex items-center justify-between px-2 py-1 rounded capitalize transition-colors duration-150 cursor-pointer mb-1 ${
                                isActive ? "bg-black text-white" : "hover:bg-gray-200 bg-transparent text-black"
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
            <button
                className="mx-2 mt-2 block flex items-center w-fit bg-black text-white px-2 py-1 rounded border border-gray-600 hover:bg-gray-200 hover:text-black"
                title="Settings"
                onClick={() => {
                    console.log('Settings');
                }}
            >
                <Settings size={18} />
                <span className="ml-2">Settings</span>
            </button>
        </aside>
    )
}