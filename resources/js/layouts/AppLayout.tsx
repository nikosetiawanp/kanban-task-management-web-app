import AppHeader from '@/components/AppHeader';
import AppSidebar from '@/components/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Board } from '@/types/board';
import { ReactNode } from 'react';

export default function AppLayout({
    children,
    board,
}: {
    children: ReactNode;
    board: Board;
}) {
    return (
        <SidebarProvider>
            <AppSidebar board={board} />
            <SidebarTrigger></SidebarTrigger>
            <div className="flex w-full flex-col">
                <AppHeader board={board} />
                {children}
            </div>
        </SidebarProvider>
    );
}
