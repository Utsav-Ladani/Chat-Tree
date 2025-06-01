import { useState } from "react";
import { getApiKeyFromLocalStorage, setApiKeyToLocalStorage } from "../LLM";

export default function ProviderSettings({ provider }) {
    const { name, id } = provider;

    const [apiKey, setApiKey] = useState(() => getApiKeyFromLocalStorage(id));

    return (
        <li className="flex flex-col gap-1">
            <label
                htmlFor={`${id}-api-key`}
                className="text-sm text-gray-500 font-medium"
            >
                {name} API Key
            </label>
            <input
                type="text"
                id={`${id}-api-key`}
                placeholder={`Enter ${name} API Key`}
                className="hidden-input-chars w-full border border-gray-300 rounded-sm px-2 py-1"
                spellCheck={false}
                autoComplete="off"
                value={apiKey}
                onChange={(e) => {
                    setApiKey(e.target.value);
                    setApiKeyToLocalStorage(id, e.target.value);
                }}
            />
        </li>
    )
}