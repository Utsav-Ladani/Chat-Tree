import { MODEL_PROVIDERS } from "../utils/constants";
import { X } from "lucide-react";
import ProviderSettings from "./ProviderSettings";

export default function SettingsModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <div className="fixed inset-0 z-2 flex items-center justify-center bg-black/80">
            <form
                className="flex flex-col gap-2 items-start h-[300px] w-[500px] bg-white rounded-sm"
                onSubmit={handleSubmit}
            >
                <div className="flex justify-between items-center border-b-2 border-gray-300 px-4 py-2 w-full">
                    <div>
                        <h2 className="text-lg font-medium">Settings</h2>
                        <p className="text-sm text-gray-500 font-medium">Settings will be saved automatically</p>
                    </div>
                    <button className="text-sm text-gray-500 font-medium hover:text-gray-700" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <ul className="flex flex-col gap-2 w-full flex-1 px-4">
                    {MODEL_PROVIDERS.map(provider => (
                        <ProviderSettings
                            key={provider.id}
                            provider={provider}
                        />
                    ))}
                </ul>
            </form>
        </div>
    )
}
