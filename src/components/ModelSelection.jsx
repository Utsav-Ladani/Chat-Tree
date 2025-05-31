import { ModelSelectionContext } from "../contexts";
import { useContext } from "react";
import { MODEL_PROVIDERS } from "../utils/constants";

export default function ModelSelection() {
    const { modelSelection } = useContext(ModelSelectionContext);

    if (!modelSelection?.providerId || !modelSelection?.modelId) {
        return null;
    }

    return (
        <div className="flex flex-col m-2 py-2 border-t border-gray-400 truncate">
            <span className="text-sm text-gray-500 font-bold">{MODEL_PROVIDERS.find(provider => provider.id === modelSelection.providerId)?.name}</span>
            <span className="text-sm ">{modelSelection.modelId}</span>
        </div>
    )
}