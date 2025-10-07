import { Board } from '@/types/board';
import { router } from '@inertiajs/react';
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

import IconVerticalEllipsis from '../assets/icon-vertical-ellipsis.svg';
import LogoMobile from '../assets/logo-mobile.svg';

export default function AppHeader({ board }: { board: Board }) {
    return (
        <header className="flex h-[100px] w-full items-center gap-4 border-b px-8 dark:border-b-[#3E3F4E] dark:bg-sidebar">
            <img className="md:hidden" src={LogoMobile} alt="" />
            <span className="mr-auto text-[24px] font-bold">{board.name}</span>
            {board && <TaskForm mode="create" board={board} />}

            <DropdownMenu>
                <DropdownMenuTrigger className="min-w-[44px]">
                    <Button className="w-full" variant="ghost">
                        <img
                            src={IconVerticalEllipsis}
                            alt="icon-vertical-ellipsis"
                        />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="flex flex-col border-0">
                    <BoardForm mode={'edit'} board={board} />
                    <DeleteBoard board={board} />
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
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
            <AlertDialogContent className="max-w-[415px] border-0">
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
                    <AlertDialogCancel className="w-full p-0">
                        <Button className="w-full" variant="secondary">
                            Cancel
                        </Button>
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
