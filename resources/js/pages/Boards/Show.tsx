import AppHeader from '@/components/AppHeader';
import AppSidebar from '@/components/AppSidebar';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Board, Status } from '@/types/board';

export default function Show({ board }: { board: Board }) {
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
            <span>{status.name}</span>
            {status?.tasks?.map((task) => {
                return <Task key={task.id} />;
            })}
        </div>
    );
}

function Task() {
    return (
        <Card className="p-4">
            <CardTitle>Task Title</CardTitle>
            <CardDescription>0 of 2 subtasks</CardDescription>
        </Card>
    );
}
