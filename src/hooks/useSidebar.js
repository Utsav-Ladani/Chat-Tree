import { useContext } from 'react';
import { SidebarContext } from '../contexts';

export function useSidebar() {
    const context = useContext(SidebarContext);

    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }

    return context;
} 