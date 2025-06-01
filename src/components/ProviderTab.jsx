import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { ModelSelectionContext, TabViewContext } from "../contexts";
import { getModelsFromIndexedDB, saveModelsToIndexedDB } from "../db/model";
import { RefreshCcw } from "lucide-react";
import { fetchModelsFromProvider } from "../LLM";

export function ProviderTab({ provider }) {
    const { activeTabId } = useContext(TabViewContext);
    const { modelSelection, handleModelSelection } = useContext(ModelSelectionContext);

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

    const handleModelRefresh = async () => {
        setIsLoading(true);
        setSearch('');

        const models = await fetchModelsFromProvider(provider.id);

        await saveModelsToIndexedDB(provider.id, models);

        setModels(models);
        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <div className="flex gap-2 justify-center items-center w-120 h-[300px]">
                <Loader2 className="animate-spin" />
                <span>Loading models</span>
            </div>
        )
    }

    if (!filteredModels?.length) {
        return (
            <div className="flex gap-2 justify-center items-center w-120 h-[300px]">
                <p>No models found from <strong>{provider.name}</strong>. Please check your API key.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2 w-120 h-[300px]">
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Search models"
                    className="w-full border border-gray-300 rounded-sm px-2 py-1"
                    value={search}
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
                <button
                    className="bg-black text-white px-2 py-1 rounded-sm whitespace-nowrap"
                    onClick={handleModelRefresh}
                    title="Refresh models list"
                >
                    <RefreshCcw size={16} />
                </button>
            </div>
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
    )
}

