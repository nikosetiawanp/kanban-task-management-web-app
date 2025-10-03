import AppHeader from '@/components/AppHeader';
import AppSidebar from '@/components/AppSidebar';
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
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Board, Status, Task } from '@/types/board';
import { router, useForm } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';
import { EllipsisVertical } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Show({ board }: { board: Board }) {
    useEffect(() => {
        console.log(board);
    }, []);
    return (
        <SidebarProvider>
            <AppSidebar board={board} />
            <SidebarTrigger></SidebarTrigger>
            <div className="flex w-full flex-col">
                <AppHeader board={board} />
                <div className="w-full p-8">
                    <div className="flex gap-4">
                        {board?.statuses?.map((status) => {
                            return (
                                <Column
                                    status={status}
                                    board={board}
                                    key={status.id}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}

function Column({ status, board }: { status: Status; board: Board }) {
    return (
        <div className="flex w-full max-w-[280px] min-w-[280px] flex-col gap-4">
            <span>
                {status.name} ({status?.tasks?.length})
            </span>
            {status?.tasks?.map((task) => {
                return (
                    <TaskCard
                        key={task.id}
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
    task,
    status,
    statuses,
}: {
    task: Task;
    status: Status;
    statuses: Status[];
}) {
    const completedSubtasks = task.subtasks.filter(
        (subtask) => subtask.completed === true,
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
                <Card className="flex w-full flex-col items-start gap-2 p-6">
                    {/* <div className="flex flex-col items-start justify-start gap-2 bg-destructive"> */}
                    <CardTitle className="">{task.title}</CardTitle>
                    <CardDescription>
                        {completedSubtasks.length} of {task.subtasks.length}{' '}
                        subtasks
                    </CardDescription>
                    {/* </div> */}
                </Card>
            </DialogTrigger>

            <DialogContent className="gap-6">
                <DialogHeader className="gap-6">
                    <div className="flex items-center justify-between">
                        <DialogTitle>{task.title}</DialogTitle>

                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant="ghost" size="icon">
                                    <EllipsisVertical />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Edit Task</DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <DeleteTask task={task} />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <DialogDescription>{task.description}</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                    <span>
                        Subtasks ({completedSubtasks.length} of{' '}
                        {task.subtasks.length})
                    </span>
                    {task.subtasks.map((subtask) => {
                        return (
                            <Card className="flex items-center justify-start gap-2 p-3">
                                <div className="flex w-full items-center justify-start gap-4">
                                    <Checkbox checked={subtask.completed} />
                                    <span
                                        className={cn(
                                            subtask.completed &&
                                                'text-secondary line-through',
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
                        });
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <Label>Status</Label>
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

                {/* <Select
                    defaultValue={task.statusId}
                    value={task.statusId}
                    onValueChange={(value) => {
                        router.put(`/tasks/${task.id}`, {
                            id: task.id,
                            title: task.title,
                            description: task.description,
                            statusId: value,
                        });
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <Label>Status</Label>
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                    </div>
                    <SelectContent>
                        {statuses?.map((status) => (
                            <SelectItem key={status.id} value={status.id}>
                                {status.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select> */}
            </DialogContent>
        </Dialog>
    );
}

function DeleteTask({ task }: { task: Task }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger>Delete Task</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-destructive">
                        Delete this task?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete the ‘{task.title}’ task
                        and its subtasks? This action cannot be reversed.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            router.delete(`/tasks/${task.id}`);
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
