import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';

export default function TaskForm() {
    const { data, setData, post, errors } = useForm({
        title: '',
        description: '',
        subtasks: [''],
    });

    const addSubtask = () => setData('subtasks', [...data.subtasks, '']);
    const removeSubtask = (subtaskIndex: number) => {
        const updatedSubtasks = data.subtasks.filter(
            (_, index) => index !== subtaskIndex,
        );
        setData('subtasks', updatedSubtasks);
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button>+ Add new task</Button>
            </DialogTrigger>
            <DialogContent className="gap-6">
                <DialogHeader className="mb-4">
                    <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                    <Label>Title</Label>
                    <Input />
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Description</Label>
                    <Textarea
                        className="min-h-[120px] resize-none"
                        placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Subtasks</Label>
                    {data.subtasks.map((subtask, index) => {
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-2"
                            >
                                <Input />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-8"
                                    onClick={() => removeSubtask(index)}
                                >
                                    <X />
                                </Button>
                            </div>
                        );
                    })}
                </div>
                <Button onClick={() => addSubtask()} variant={'secondary'}>
                    + Add New Subtask
                </Button>

                <Select>
                    <div className="flex flex-col gap-2">
                        <Label>Status</Label>
                        <SelectTrigger>
                            <SelectValue placeholder="Todo" />
                        </SelectTrigger>
                    </div>
                    <SelectContent defaultValue={'todo'}>
                        <SelectItem value="todo">Todo</SelectItem>
                        <SelectItem value="doing">Doing</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                </Select>

                <Button>Create Task</Button>
            </DialogContent>
        </Dialog>
    );
}
