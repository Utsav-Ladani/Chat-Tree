import { useState } from "react";
import { useContext } from "react";
import { fetchModelsFromProvider, getApiKeyFromLocalStorage, setApiKeyToLocalStorage } from "../LLM";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { ModelSelectionContext, TabViewContext } from "../contexts";
import { getModelsFromIndexedDB, saveModelsToIndexedDB } from "../db/model";

export function ProviderTab({ provider }) {
    const { activeTabId } = useContext(TabViewContext);
    const { modelSelection, handleModelSelection } = useContext(ModelSelectionContext);

    const [apiKey, setApiKey] = useState(() => getApiKeyFromLocalStorage(provider.id));
    const [isLoading, setIsLoading] = useState(false);
    const [models, setModels] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredModels, setFilteredModels] = useState([]);

    useEffect(() => {
        if (activeTabId !== provider.id) {
            return;
        }

        let isUnmounted = false;

        async function fetchModels() {
            setIsLoading(true);
            const models = await getModelsFromIndexedDB(provider.id);

            if (isUnmounted) {
                return;
            }

            setModels(models);
            setIsLoading(false);
        }

        fetchModels();

        return () => {
            isUnmounted = true;
        };
    }, [activeTabId, provider.id]);

    useEffect(() => {
        setFilteredModels(models.filter((model) => model.id.toLowerCase().includes(search)));
    }, [search, models]);

    if (activeTabId !== provider.id) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!apiKey) {
            return;
        }

        setIsLoading(true);
        setApiKeyToLocalStorage(provider.id, apiKey);

        const models = await fetchModelsFromProvider(provider.id);

        await saveModelsToIndexedDB(provider.id, models);

        setModels(models);
        setIsLoading(false);
    }

    return (
        <div className="flex flex-col gap-2 w-120">
            <form className="flex gap-2" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={`Enter ${provider.name} API Key`}
                    className="hidden-input-chars w-full border border-gray-300 rounded-sm px-2 py-1"
                    spellCheck={false}
                    autoComplete="off"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
                <button className="bg-black text-white px-2 py-1 rounded-sm whitespace-nowrap">Save & Refresh</button>
            </form>
            {
                isLoading ?
                    <div className="flex gap-2 justify-center items-center h-[300px]">
                        <Loader2 className="animate-spin" />
                        <span>Loading models</span>
                    </div> :
                    <div className="flex flex-col gap-2 h-[300px]">
                        <input
                            type="text"
                            placeholder="Search models"
                            className="w-full border border-gray-300 rounded-sm px-2 py-1"
                            value={search}
                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                        />
                        <ul className="h-full overflow-y-auto">
                            {filteredModels.map((model) => (
                                <li
                                    key={model.id}
                                    className={`py-1 px-2 cursor-pointer ${model.id === modelSelection.modelId ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                                    onClick={() => handleModelSelection(provider.id, model.id)}
                                >
                                    {model.id} {model.id === modelSelection.modelId && "✅"}
                                </li>
                            ))}
                        </ul>
                    </div>
            }
        </div>
    )
}

