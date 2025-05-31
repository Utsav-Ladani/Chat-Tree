import { useState } from 'react';
import { ModelSelectionContext } from '../contexts';
import { getModelSelectionFromLocalStorage, setModelSelectionToLocalStorage } from '../LLM';

export function ModelSelectionProvider({ children }) {
    const [modelSelection, setModelSelection] = useState(() => getModelSelectionFromLocalStorage());

    const handleModelSelection = (providerId, modelId) => {
        setModelSelection({ providerId, modelId });
        setModelSelectionToLocalStorage(providerId, modelId);
    }

    const value = {
        modelSelection,
        handleModelSelection
    };

    return (
        <ModelSelectionContext.Provider value={value}>
            {children}
        </ModelSelectionContext.Provider>
    );
} 