import { Board } from '@/types/board';
import { router } from '@inertiajs/react';
import { EllipsisVertical } from 'lucide-react';
import { useEffect } from 'react';
import BoardForm from './BoardForm';
import TaskForm from './TaskForm';
import {
    AlertDialog,
    AlertDialogAction,
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

export default function AppHeader({ board }: { board: Board }) {
    useEffect(() => {
        console.log(board);
    }, []);
    return (
        <header className="flex h-[100px] w-full items-center gap-4 border-b bg-background p-4">
            <span className="mr-auto">{board.name}</span>
            {board && <TaskForm mode="create" board={board} />}

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon">
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="flex flex-col">
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
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Delete Board
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-destructive">
                        Delete this board?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete the {board?.name} board?
                        This action will remove all columns and tasks and cannot
                        be reversed.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction
                        onClick={() => {
                            router.delete('/boards/' + board?.id);
                        }}
                        className="bg-destructive"
                    >
                        Delete
                    </AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
