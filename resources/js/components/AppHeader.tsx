import { Board } from '@/types/board';
import { Link, router, usePage } from '@inertiajs/react';
import BoardForm from './BoardForm';
import TaskForm from './TaskForm';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

import IconChevronDown from '../assets/icon-chevron-down.svg';

import { cn } from '@/lib/utils';
import IconVerticalEllipsis from '../assets/icon-vertical-ellipsis.svg';
import LogoMobile from '../assets/logo-mobile.svg';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Switch } from './ui/switch';

import IconDarkTheme from '../assets/icon-dark-theme.svg';
import IconLightTheme from '../assets/icon-light-theme.svg';
import { useTheme } from './theme-provider';

export default function AppHeader({ board }: { board: Board }) {
    const { boards } = usePage<{ boards: Board[]; url: string }>().props;

    return (
        <header className="flex h-[100px] w-full items-center gap-4 border-b bg-sidebar px-6 lg:px-8 dark:border-b-[#3E3F4E] dark:bg-sidebar">
            <img className="md:hidden" src={LogoMobile} alt="" />
            <span className="mr-auto hidden text-[24px] font-bold md:block">
                {board.name}
            </span>

            <MobileSidebar board={board} boards={boards} />
            <button></button>
            {board && <TaskForm mode="create" board={board} />}

            <DropdownMenu>
                <DropdownMenuTrigger
                    disabled={!board.id}
                    className="flex justify-center px-2 py-1 hover:cursor-pointer disabled:opacity-50"
                >
                    {/* <Button className="w-full" variant="ghost"> */}
                    <img
                        src={IconVerticalEllipsis}
                        alt="icon-vertical-ellipsis"
                    />
                    {/* </Button> */}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col border-0">
                    <BoardForm mode={'edit'} board={board} />
                    <DeleteBoard board={board} />
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}

function MobileSidebar({ board, boards }: { board: Board; boards: Board[] }) {
    const { theme, setTheme } = useTheme();

    return (
        <Dialog>
            <DialogTrigger className="mr-auto flex items-center gap-3 text-[18px] font-bold md:hidden">
                {board.name && board.name}
                {!board.name && 'Select Board'}
                <img src={IconChevronDown} alt="icon-chevron-down" />
            </DialogTrigger>
            <DialogContent className="max-w-[325px] border-0 bg-card p-0 py-6 md:hidden">
                <span className="pl-6 text-left text-[12px] font-bold tracking-[2.4px] text-sidebar-foreground">
                    ALL BOARDS ({boards.length})
                </span>
                <div className="flex flex-col pr-4">
                    {boards.map((b) => {
                        return (
                            <Link
                                key={b.id}
                                className={cn(
                                    'flex w-full items-center gap-4 rounded-r-full px-6 py-4 font-bold text-sidebar-foreground',
                                    b.id === board.id &&
                                        'bg-primary text-white',
                                )}
                                href={'/boards/' + b.id}
                            >
                                <svg
                                    className={cn(
                                        'group:active:fill-primary group:hover:fill-primary fill-sidebar-foreground group-hover:text-primary',
                                        b.id === board.id && 'fill-white',
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
                                {b.name}
                            </Link>
                        );
                    })}
                    <BoardForm mode={'create'} />
                </div>

                <div className="px-6">
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
                </div>
            </DialogContent>
        </Dialog>
    );
}

function DeleteBoard({ board }: { board: Board }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <DropdownMenuItem
                    className="text-destructive"
                    onSelect={(e) => e.preventDefault()}
                >
                    Delete Board
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[415px] border-0 bg-card">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-left text-destructive">
                        Delete this board?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-left text-[13px] leading-[23px]">
                        Are you sure you want to delete the {board?.name} board?
                        This action will remove all columns and tasks and cannot
                        be reversed.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-4">
                    <Button
                        className="w-full max-sm:order-1"
                        variant="destructive"
                        onClick={() => {
                            router.delete('/boards/' + board?.id);
                        }}
                    >
                        Delete
                    </Button>
                    <AlertDialogCancel className="w-full border-0 p-0">
                        <Button className="w-full" variant="secondary">
                            Cancel
                        </Button>
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
