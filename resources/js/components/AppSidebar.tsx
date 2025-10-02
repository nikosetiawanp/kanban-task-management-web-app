import { Board } from '@/types/board';
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

import { Calendar } from 'lucide-react';

import BoardForm from './BoardForm';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from './ui/sidebar';

export default function AppSidebar({ board }: { board: Board }) {
    const { boards, url } = usePage<{ boards: Board[]; url: string }>().props;

    useEffect(() => {}, []);
    return (
        <Sidebar>
            <SidebarHeader>
                <span>KANBAN</span>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        ALL BOARDS ({boards.length})
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {boards?.map((b) => {
                                return (
                                    <Link key={b.id} href={'/boards/' + b.id}>
                                        <SidebarMenuItem key={b.id}>
                                            <SidebarMenuButton
                                                isActive={b.id === board.id}
                                            >
                                                <Calendar />
                                                {b?.name}
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </Link>
                                );
                            })}
                            <SidebarMenuItem>
                                <BoardForm mode={'create'} />
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                Footer
                {/* <SidebarTrigger></SidebarTrigger> */}
            </SidebarFooter>
        </Sidebar>
    );
}
