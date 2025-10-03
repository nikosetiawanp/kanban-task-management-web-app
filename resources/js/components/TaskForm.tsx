import { cn } from '@/lib/utils';
import { Board, Subtask } from '@/types/board';
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

export default function TaskForm({ board }: { board: Board }) {
    const { data, setData, post, errors } = useForm<{
        title: string;
        description: string;
        subtasks: Subtask[];
        statusId?: string;
    }>({
        title: '',
        description: '',
        subtasks: [],
        statusId: board ? board?.statuses[0]?.id : '',
    });

    const emptySubtask = { name: '', completed: false };

    const addSubtask = () =>
        setData('subtasks', [...data?.subtasks, emptySubtask]);
    const removeSubtask = (subtaskIndex: number) => {
        const updatedSubtasks = data.subtasks.filter(
            (_, index) => index !== subtaskIndex,
        );
        setData('subtasks', updatedSubtasks);
    };

    const submit = () => {
        post('/tasks');
        console.log(data);
    };

    return (
        <Dialog>
            <DialogTrigger disabled={board?.statuses?.length <= 0}>
                <Button disabled={board?.statuses?.length <= 0}>
                    + Add new task
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="mb-4">
                    <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submit();
                    }}
                    className="flex flex-col gap-6"
                    action=""
                >
                    <div className="flex flex-col gap-2">
                        <Label>Title</Label>
                        <Input
                            className={cn(errors.title && 'border-destructive')}
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Description</Label>
                        <Textarea
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
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
                                    <Input
                                        className={cn(
                                            errors[`subtasks.${index}.name`] &&
                                                'border-destructive',
                                        )}
                                        value={data.subtasks[index].name}
                                        onChange={(e) => {
                                            const updatedSubtasks = [
                                                ...data.subtasks,
                                            ];
                                            updatedSubtasks[index].name =
                                                e.target.value;
                                            setData(
                                                'subtasks',
                                                updatedSubtasks,
                                            );
                                        }}
                                    />
                                    <Button
                                        type="button"
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
                    <Button
                        type="button"
                        onClick={() => addSubtask()}
                        variant={'secondary'}
                    >
                        + Add New Subtask
                    </Button>

                    <Select
                        value={data.statusId}
                        onValueChange={(value) => setData('statusId', value)}
                        defaultValue={data.statusId}
                        disabled={board?.statuses?.length <= 0}
                    >
                        <div className="flex flex-col gap-2">
                            <Label>Status</Label>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                        </div>
                        <SelectContent defaultValue={data.statusId}>
                            {board?.statuses?.map((status) => {
                                return (
                                    <SelectItem
                                        key={status.id}
                                        value={status.id || ''}
                                    >
                                        {status.name}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>

                    <Button>Create Task</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
