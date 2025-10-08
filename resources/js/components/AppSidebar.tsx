import { Board } from '@/types/board';
import { Link, usePage } from '@inertiajs/react';

import { cn } from '@/lib/utils';
import BoardForm from './BoardForm';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from './ui/sidebar';

import IconDarkTheme from '../assets/icon-dark-theme.svg';
import IconHideSidebar from '../assets/icon-hide-sidebar.svg';
import IconLightTheme from '../assets/icon-light-theme.svg';

import IconShowSidebar from '../assets/icon-show-sidebar.svg';
import LogoDark from '../assets/logo-dark.svg';
import LogoLight from '../assets/logo-light.svg';

import { useTheme } from './theme-provider';
import { Button } from './ui/button';
import { Switch } from './ui/switch';

export default function AppSidebar({ board }: { board: Board }) {
    const { boards } = usePage<{ boards: Board[]; url: string }>().props;
    const { open, setOpen } = useSidebar();
    const { theme, setTheme } = useTheme();

    return (
        <>
            <Sidebar className="border-r font-bold dark:border-r-[#3E3F4E]">
                <SidebarHeader className="h-[100px] justify-center p-6">
                    <img
                        className="w-[150px]"
                        src={theme === 'dark' ? LogoLight : LogoDark}
                        alt=""
                    />
                </SidebarHeader>
                <SidebarContent className="gap-4">
                    <span className="pl-6 text-[12px] tracking-[2.4px]">
                        ALL BOARDS ({boards.length})
                    </span>
                    <SidebarMenu className="gap-0 pr-4">
                        {boards?.map((b) => {
                            return (
                                <Link key={b.id} href={'/boards/' + b.id}>
                                    <SidebarMenuItem key={b.id}>
                                        <SidebarMenuButton
                                            className={cn(
                                                'group gap-4 rounded-l-none rounded-r-full py-6 pl-6 font-bold hover:cursor-pointer hover:bg-[#979797]/10 hover:text-primary active:bg-white active:text-primary dark:hover:bg-white',
                                                b.id === board.id &&
                                                    'bg-primary text-white hover:bg-primary hover:text-white dark:hover:bg-primary',
                                            )}
                                        >
                                            <svg
                                                className={cn(
                                                    'group:active:fill-primary group:hover:fill-primary fill-sidebar-foreground group-hover:text-primary',
                                                    b.id === board.id &&
                                                        'fill-white',
                                                )}
                                                width="16"
                                                height="16"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                                                    fill=""
                                                />
                                            </svg>
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
                </SidebarContent>

                <SidebarFooter className="gap-8 px-3 pb-8">
                    <div className="flex w-full items-center justify-center gap-6 rounded-[6px] bg-background py-3">
                        <img src={IconLightTheme} alt="icon-light-theme" />
                        <Switch
                            className="hover:cursor-pointer data-[state=unchecked]:bg-primary"
                            checked={theme === 'dark'}
                            onClick={() => {
                                {
                                    theme === 'light' && setTheme('dark');
                                    theme === 'dark' && setTheme('light');
                                }
                            }}
                        />
                        <img src={IconDarkTheme} alt="icon-dark-theme" />
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-4 px-4 hover:cursor-pointer"
                    >
                        <img src={IconHideSidebar} alt="icon-hide-sidebar" />
                        <span className="text-[15px]">Hide Sidebar</span>
                    </button>
                </SidebarFooter>
            </Sidebar>
            {!open && (
                <Button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 rounded-l-none"
                >
                    <img src={IconShowSidebar} alt="" />
                </Button>
            )}
        </>
    );
}
