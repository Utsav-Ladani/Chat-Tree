import { Link } from "react-router-dom";
import PlusIcon from "../icons/PlusIcon";

export default function Sidebar({ chatRootNodes, onNewChat }) {
    return (
        <aside className="bg-gray-100 py-4 w-64 border-r border-gray-200">
            <header className="flex justify-between items-center mb-6 px-4">
                <Link to="/">
                    <h2 className="text-2xl font-bold">Chat Trees 🌳</h2>
                </Link>
                <button
                    className="bg-black text-white p-1 rounded border border-gray-300 hover:bg-gray-200 hover:text-black hover:cursor-pointer"
                    onClick={onNewChat}
                >
                    <PlusIcon className="size-5" />
                </button>
            </header>
            <ul className="flex flex-col gap-2 overflow-y-auto px-2">
                {chatRootNodes.map((node) => (
                    <li key={node.id} className="p-0">
                        <Link
                            className="px-2 py-1 hover:bg-gray-200 hover:cursor-pointer rounded block capitalize"
                            to={`/chat/${node.id}`}
                        >
                            {node.user || 'Untitled'}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    )
}