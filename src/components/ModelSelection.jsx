import { ModelSelectionContext } from "../contexts";
import { useContext } from "react";
import { MODEL_PROVIDERS } from "../utils/constants";
import ModelSelector from "./ModelSelector";
import { useState } from "react";

export default function ModelSelection() {
    const { modelSelection } = useContext(ModelSelectionContext);
    const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);

    if (!modelSelection?.providerId || !modelSelection?.modelId) {
        return null;
    }

    return (
        <>
            <div className="flex flex-col mx-2 pt-2 border-t border-gray-400">
                <div className="font-bold">Selected Model</div>
                <span className="text-sm text-gray-500 font-bold">{MODEL_PROVIDERS.find(provider => provider.id === modelSelection.providerId)?.name}</span>
                <span className="text-sm truncate">{modelSelection.modelId}</span>
            </div>
            <button
                className="text-sm text-gray-500 text-white bg-black p-2 rounded-sm m-2 cursor-pointer hover:bg-gray-800"
                onClick={() => setIsModelSelectorOpen(true)}
            >
                Change Model
            </button>
            <ModelSelector isOpen={isModelSelectorOpen} onClose={() => setIsModelSelectorOpen(false)} />
        </>
    )
}