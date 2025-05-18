import { X } from "lucide-react";
import { useState } from "react";
import { AI_MODEL_OPTIONS } from "../utils/constants";

export default function SettingsModal({ isOpen, onClose }) {
    const [modelName, setModelName] = useState(() => localStorage.getItem('model-name') || AI_MODEL_OPTIONS[0].modelIdentifier);
    const [apiKey, setApiKey] = useState(() => localStorage.getItem('api-key') || '');

    if (!isOpen) return null;

    function handleSubmit(e) {
        e.preventDefault();

        localStorage.setItem('model-name', modelName);
        localStorage.setItem('api-key', apiKey);

        onClose();
    }

    return (
        <div className="fixed inset-0 z-2 flex items-center justify-center bg-black/80">
            <form className="flex flex-col gap-4 bg-white py-4 px-6 rounded w-80 relative" onSubmit={handleSubmit}>
                <h2 className="text-2xl border-b-2 border-gray-200 pb-2">Settings</h2>
                <div className="flex flex-col gap-2">
                    <label htmlFor="model-select" className="text-sm text-gray-500">Model:</label>
                    <select
                        id="model-select"
                        className="border border-gray-300 rounded px-2 py-1"
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                    >
                        {AI_MODEL_OPTIONS.map((option) => (
                            <option key={option.optionKey} value={option.modelIdentifier}>
                                {option.provider} - {option.modelName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="api-key-input" className="text-sm text-gray-500">API Key:</label>
                    <input
                        id="api-key-input"
                        type="password"
                        className="border border-gray-300 rounded px-2 py-1"
                        placeholder="Enter your API key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-3 py-1 rounded border border-gray-300 hover:border-blue-500 hover:text-black hover:bg-blue-100"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="bg-white text-black px-3 py-1 rounded border border-gray-300 hover:text-red-500 hover:bg-red-100 hover:border-red-500"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
                <button type="button" className="text-sm text-gray-500 hover:text-gray-700 absolute top-4 right-6" onClick={onClose}>
                    <X className="rounded p-1 hover:text-red-500 hover:bg-red-100 hover:border hover:border-red-500" />
                </button>
            </form>
        </div>
    )
}