import { MODEL_PROVIDERS } from "../utils/constants";
import {ProvidersTabView} from "./ProvidersTabView";
import { ProviderTab } from "./ProviderTab";

export default function ModelSelector({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-2 flex items-center justify-center bg-black/80">
            <ProvidersTabView providers={MODEL_PROVIDERS} onClose={onClose}>
                {MODEL_PROVIDERS.map(provider => (
                    <ProviderTab key={provider.id} provider={provider} />
                ))}
            </ProvidersTabView>
        </div>
    )
}