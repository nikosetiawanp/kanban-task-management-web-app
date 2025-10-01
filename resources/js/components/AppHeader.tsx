import { Board } from '@/types/board';
import { EllipsisVertical } from 'lucide-react';
import TaskForm from './TaskForm';

export default function AppHeader({ board }: { board: Board }) {
    return (
        <header className="flex h-[100px] w-full items-center gap-4 border-b bg-background p-4">
            <span className="mr-auto">{board.name}</span>
            <TaskForm />
            {/* <Button className="ml-auto">+Add New Task</Button> */}
            <EllipsisVertical />
        </header>
    );
}
