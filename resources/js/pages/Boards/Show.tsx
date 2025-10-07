import TaskForm from '@/components/TaskForm';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/AppLayout';
import { cn } from '@/lib/utils';
import { Board, Status, Task } from '@/types/board';
import { router, useForm } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';
import IconVerticalEllipsis from '../../assets/icon-vertical-ellipsis.svg';

export default function Show({ board }: { board: Board }) {
    return (
        <AppLayout board={board}>
            <div className="h-full w-full overflow-x-auto p-8">
                {board?.id && board.statuses.length > 0 && (
                    <div className="flex h-full gap-4">
                        {board?.statuses?.map((status) => {
                            return (
                                <Column
                                    status={status}
                                    board={board}
                                    key={status.id}
                                />
                            );
                        })}

                        {/* New Column */}
                        <div className="flex h-auto w-full max-w-[280px] min-w-[280px] flex-col gap-4">
                            <div className="h-[26px]"></div>
                            <div
                                onClick={() => {
                                    router.post('/statuses', {
                                        name: 'New Column',
                                        color: '#000000',
                                        boardId: board.id,
                                    });
                                }}
                                className="flex h-full w-full flex-row items-center justify-center rounded-lg border-0 bg-card/10 p-6 hover:cursor-pointer hover:bg-card/50"
                            >
                                <span className="text-[24px] font-bold text-sidebar-foreground">
                                    + New Column
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {board.id && board.statuses.length === 0 && (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
                        <span className="text-center text-sidebar-foreground">
                            This board is empty. Create a new column to get
                            started.
                        </span>
                        <Button
                            onClick={() => {
                                router.post('/statuses', {
                                    name: 'New Column',
                                    color: '#000000',
                                    boardId: board.id,
                                });
                            }}
                        >
                            +Add New Column
                        </Button>
                    </div>
                )}

                {!board.id && board.statuses.length === 0 && (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
                        <span>
                            No board is selected. Please select a board from the
                            sidebar or create a new one to get started.
                        </span>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

function Column({ status, board }: { status: Status; board: Board }) {
    return (
        <div className="flex h-full w-full max-w-[280px] min-w-[280px] flex-col gap-4">
            <div className="flex items-center gap-2">
                <div
                    className={cn('h-[15px] w-[15px] rounded-full bg-[#fff]')}
                ></div>
                <span className="text-[12px] font-bold tracking-[2.4px] text-muted">
                    {status.name} ({status?.tasks?.length})
                </span>
            </div>
            {status?.tasks?.map((task) => {
                return (
                    <TaskCard
                        key={task.id}
                        board={board}
                        task={task}
                        status={status}
                        statuses={board.statuses}
                    />
                );
            })}
        </div>
    );
}

function TaskCard({
    board,
    task,
    status,
    statuses,
}: {
    board: Board;
    task: Task;
    status: Status;
    statuses: Status[];
}) {
    const completedSubtasks = task.subtasks.filter(
        (subtask) => subtask.completed,
    );

    const { data, setData, put } = useForm({
        id: task.id,
        title: task.title,
        description: task.description,
        statusId: status.id,
    });

    const [open, setOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={() => {
                setOpen(!open);
            }}
        >
            <DialogTrigger>
                <Card className="flex w-full flex-col items-start gap-2 border-0 p-6 hover:cursor-pointer hover:bg-accent">
                    <CardTitle className="text-heading-m text-left">
                        {task.title}
                    </CardTitle>
                    <CardDescription className="text-[12px] font-bold">
                        {completedSubtasks.length} of {task.subtasks.length}{' '}
                        subtasks
                    </CardDescription>
                </Card>
            </DialogTrigger>

            <DialogContent className="gap-6 border-0 bg-card">
                <DialogHeader className="gap-6">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-[18px]">
                            {task.title}
                        </DialogTitle>

                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant="ghost" size="icon">
                                    <img
                                        src={IconVerticalEllipsis}
                                        alt="icon-vertical-ellipsis"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="flex flex-col border-0">
                                {board && (
                                    <TaskForm
                                        mode={'edit'}
                                        board={board}
                                        task={task}
                                    />
                                )}

                                <DeleteTask task={task} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <DialogDescription className="text-left text-[13px] leading-[23px] font-medium">
                        {task.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                    <span className="text-[12px] font-bold">
                        Subtasks ({completedSubtasks.length} of{' '}
                        {task.subtasks.length})
                    </span>
                    {task.subtasks.map((subtask) => {
                        return (
                            <Card className="flex items-center justify-start gap-2 rounded-sm border-0 bg-background p-3 shadow-none hover:bg-primary/25">
                                <div className="flex w-full items-center justify-start gap-4">
                                    <Checkbox
                                        className="rounded-xs border-muted hover:cursor-pointer"
                                        checked={subtask.completed && true}
                                        onCheckedChange={() =>
                                            router.put(
                                                `/subtasks/${subtask.id}`,
                                                {
                                                    id: subtask.id,
                                                    name: subtask.name,
                                                    completed:
                                                        !subtask.completed,
                                                },
                                            )
                                        }
                                    />
                                    <span
                                        className={cn(
                                            'text-[12px] font-bold',
                                            subtask.completed &&
                                                'text-[#000]/50 line-through dark:text-[#fff]/50',
                                        )}
                                    >
                                        {subtask.name}
                                    </span>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                <Select
                    value={data.statusId}
                    defaultValue={status.id}
                    onValueChange={(value) => {
                        router.put(`/tasks/${task.id}`, {
                            id: task.id,
                            title: task.title,
                            description: task.description,
                            statusId: value,
                            subtasks: task.subtasks,
                        });
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <Label className="text-[12px] font-bold text-muted">
                            Current Status
                        </Label>
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                    </div>
                    <SelectContent>
                        {statuses?.map((status) => (
                            <SelectItem key={status.id} value={status.id || ''}>
                                {status.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </DialogContent>
        </Dialog>
    );
}

function DeleteTask({ task }: { task: Task }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger className="hover:text-destructive">
                <DropdownMenuItem
                    className="text-destructive"
                    onSelect={(e) => e.preventDefault()}
                >
                    Delete Task
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-0 bg-card">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-destructive">
                        Delete this task?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete the ‘{task.title}’ task
                        and its subtasks? This action cannot be reversed.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-4">
                    <Button
                        className="w-full"
                        onClick={(e) => {
                            e.preventDefault();
                            router.delete(`/tasks/${task.id}`);
                        }}
                        variant="destructive"
                    >
                        Delete
                    </Button>
                    <AlertDialogCancel className="w-full border-0 p-0">
                        <Button variant="secondary" className="w-full">
                            Cancel
                        </Button>
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
