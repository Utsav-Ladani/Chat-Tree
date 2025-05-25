import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { AI_MODEL_OPTIONS } from "../utils/constants";
import { getApiKeyFromLocalStorage, getModelFromLocalStorage, setApiKeyToLocalStorage, setModelToLocalStorage } from "../LLM";

export default function SettingsModal({ isOpen, onClose }) {
    const [modelIdentifier, setModelIdentifier] = useState('');
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        const model = getModelFromLocalStorage();

        if (!model) return;

        setModelIdentifier(model.modelIdentifier);
        setApiKey(getApiKeyFromLocalStorage(model.modelIdentifier));
    }, [isOpen]);

    if (!isOpen) return null;

    function handleModelChange(e) {
        const modelIdentifier = e.target.value;
        const model = AI_MODEL_OPTIONS.find(m => m.modelIdentifier === modelIdentifier);

        if (!model) return;

        setModelIdentifier(modelIdentifier);
        setApiKey(getApiKeyFromLocalStorage(modelIdentifier));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const model = AI_MODEL_OPTIONS.find(m => m.modelIdentifier === modelIdentifier);

        if (!model) return;

        setModelToLocalStorage(modelIdentifier);
        setApiKeyToLocalStorage(modelIdentifier, apiKey);

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
                        className="border border-gray-300 rounded px-2 py-2"
                        value={modelIdentifier}
                        onChange={handleModelChange}
                    >
                        <button>
                            <selectedcontent></selectedcontent>
                        </button>

                        {AI_MODEL_OPTIONS.map((option) => (
                            <option
                                key={option.modelIdentifier}
                                value={option.modelIdentifier}
                                className="py-2 px-2 checked:bg-blue-100 not-checked:hover:bg-gray-100"
                            >
                                <div>
                                    <div className="provider text-sm text-gray-500">{option.provider} </div>
                                    <div>{option.modelLabel}</div>
                                </div>
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="api-key-input" className="text-sm text-gray-500">Model API Key:</label>
                    <input
                        id="api-key-input"
                        type="password"
                        className="border border-gray-300 rounded px-2 py-1"
                        placeholder="Enter your model API key"
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