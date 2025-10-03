import AppHeader from '@/components/AppHeader';
import AppSidebar from '@/components/AppSidebar';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Board, Status, Task } from '@/types/board';
import { useEffect } from 'react';

export default function Show({ board }: { board: Board }) {
    useEffect(() => {}, []);
    return (
        <SidebarProvider>
            <AppSidebar board={board} />
            <SidebarTrigger></SidebarTrigger>
            <div className="flex w-full flex-col">
                <AppHeader board={board} />
                <div className="w-full p-8">
                    <div className="flex gap-4">
                        {board?.statuses?.map((status) => {
                            return <Column status={status} key={status.id} />;
                        })}
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}

function Column({ status }: { status: Status }) {
    return (
        <div className="flex w-full max-w-[280px] flex-col gap-4">
            <span>
                {status.name} ({status?.tasks?.length})
            </span>
            {status?.tasks?.map((task) => {
                return <TaskCard key={task.id} task={task} />;
            })}
        </div>
    );
}

function TaskCard({ task }: { task: Task }) {
    const completedSubtasks = task.subtasks.filter(
        (subtask) => subtask.completed === true,
    );
    return (
        <Card className="p-4">
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>
                {completedSubtasks.length} of {task.subtasks.length} subtasks
            </CardDescription>
        </Card>
    );
}
