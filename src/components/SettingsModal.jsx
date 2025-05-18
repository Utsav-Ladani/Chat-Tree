import { X } from "lucide-react";
import { useState } from "react";

const MODEL_SELECT_OPTIONS = [
    {
        platform: 'Docker',
        model: 'Gemma 3',
        value: 'ai/gemma3:latest'
    },
    {
        platform: 'OpenAI',
        model: 'GPT-4o-mini',
        value: 'gpt-4o-mini'
    }
]

const DEFAULT_MODEL_SELECT_OPTION = MODEL_SELECT_OPTIONS[0].value;

export default function SettingsModal({ isOpen, onClose }) {
    const [modelName, setModelName] = useState(() => localStorage.getItem('model-name') || DEFAULT_MODEL_SELECT_OPTION);
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
                        {MODEL_SELECT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.platform} - {option.model}
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