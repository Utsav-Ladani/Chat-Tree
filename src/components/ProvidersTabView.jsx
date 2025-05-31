import { useState } from "react";
import { useContext } from "react";
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
