import { useState } from 'react';
import { SidebarContext } from '../contexts';

const SIDEBAR_STATE_KEY = 'ui:is-sidebar-open';

export function SidebarProvider({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(
        () => localStorage.getItem(SIDEBAR_STATE_KEY) === 'true'
    );

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        localStorage.setItem(SIDEBAR_STATE_KEY, !isSidebarOpen);
    };

    const value = {
        isSidebarOpen,
        toggleSidebar
    };

    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    );
} 