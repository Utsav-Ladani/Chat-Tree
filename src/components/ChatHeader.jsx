export default function ChatHeader({ title }) {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200">
            <h1 className="text-2xl font-bold capitalize">{title}</h1>
        </header>
    );
}