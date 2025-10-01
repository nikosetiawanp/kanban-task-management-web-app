import { cn } from '@/lib/utils';
import { Status } from '@/types/board';
import { useForm } from '@inertiajs/react';
import { Calendar, X } from 'lucide-react';
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

export default function TaskForm() {
    const { data, setData, post, processing, errors, reset } = useForm<{
        name: string;
        statuses: Status[];
    }>({
        name: '',
        statuses: [],
    });

    const addStatus = () => {
        const newStatus: Status = { name: '', color: '#000000' };
        setData('statuses', [...data?.statuses, newStatus]);
    };
    const removeStatus = (index: number) => {
        setData(
            'statuses',
            data.statuses.filter((status, i) => i !== index),
        );
    };

    const submit = () => {
        post('/boards');
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button>
                    <Calendar />+ Create New Board
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="mb-4">
                    <DialogTitle>Add New Board</DialogTitle>
                </DialogHeader>

                <form
                    className="flex flex-col gap-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        submit();
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <Label>Name</Label>
                        <Input
                            className={cn(errors?.name && 'border-destructive')}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors?.name && <span>{errors.name}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Board Columns</Label>
                        {data.statuses.map((status, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <Input
                                        value={status.name}
                                        onChange={(e) =>
                                            setData(
                                                `statuses.${index}.name`,
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="size-8"
                                        onClick={() => removeStatus(index)}
                                    >
                                        <X />
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                    <Button
                        type="button"
                        onClick={() => addStatus()}
                        variant={'secondary'}
                    >
                        + Add New Column
                    </Button>

                    <Button type="submit">Create Board</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
