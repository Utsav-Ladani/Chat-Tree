import { useState } from "react";
import { useContext } from "react";
import { fetchModels, getApiKeyFromLocalStorage, setApiKeyToLocalStorage } from "../LLM";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { X } from "lucide-react";
import { ModelSelectionContext, TabViewContext } from "../contexts";

export function ProvidersTabView({ children, providers, onClose }) {
    const { modelSelection } = useContext(ModelSelectionContext);

    const [activeTabId, setActiveTabId] = useState(() => modelSelection.providerId || providers[0].id);

    return (
        <TabViewContext.Provider value={{ activeTabId }}>
            <div className="flex flex-col bg-white rounded py-2 gap-2">
                <div className="flex justify-between border-b px-2">
                    <div className="flex">
                        {providers.map((provider) => (
                            <button
                                key={provider.id}
                                className={`px-2 py-1 rounded-t-sm ${activeTabId === provider.id ? 'bg-black text-white' : ''}`}
                                onClick={() => setActiveTabId(provider.id)}
                            >
                                {provider.name}
                            </button>
                        ))}
                    </div>
                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>
                <div className="px-4">
                    {children}
                </div>
            </div>
        </TabViewContext.Provider>
    )
}

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

        async function updateModels() {
            setIsLoading(true);
            const models = await fetchModels(provider.id);

            if (isUnmounted) {
                return;
            }

            setModels(models);
            setIsLoading(false);
        }

        updateModels();

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

        const models = await fetchModels(provider.id);

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
                                    onClick={() => handleModelSelection(provider.id,model.id )}
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

