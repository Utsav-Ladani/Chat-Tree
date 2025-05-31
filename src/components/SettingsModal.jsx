import { MODEL_PROVIDERS } from "../utils/constants";
import {ProvidersTabView, ProviderTab} from "./ProvidersTabView";

export default function SettingsModal({ isOpen, onClose }) {
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