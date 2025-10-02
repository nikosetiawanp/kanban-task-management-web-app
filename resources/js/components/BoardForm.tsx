import { cn } from '@/lib/utils';
import { Board, Status } from '@/types/board';
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

export default function BoardForm({
    mode,
    board,
}: {
    mode: 'create' | 'edit';
    board?: Board;
}) {
    const emptyData = { name: '', statuses: [] };

    const { data, setData, post, processing, errors, reset, put } = useForm<{
        name: string;
        statuses: Status[];
    }>(board || emptyData);

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
        mode === 'create' && post('/boards');
        mode === 'edit' && put('/boards/' + board?.id);
    };

    return (
        <Dialog
            key={mode === 'edit' ? board?.id : 'create'}
            onOpenChange={() => reset()}
        >
            {mode === 'create' && (
                <DialogTrigger>
                    <Button>
                        <Calendar />+ Create New Board
                    </Button>
                </DialogTrigger>
            )}

            {mode === 'edit' && <DialogTrigger>Edit Board</DialogTrigger>}

            <DialogContent>
                <DialogHeader className="mb-4">
                    <DialogTitle>
                        {mode === 'create' && 'Add New Board'}
                        {mode === 'edit' && 'Edit Board'}
                    </DialogTitle>
                </DialogHeader>

                <form
                    className="flex flex-col gap-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        submit();
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <Label
                            className={cn(errors?.name && 'text-destructive')}
                        >
                            Board Name
                        </Label>
                        <Input
                            className={cn(errors?.name && 'border-destructive')}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
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
                                        className={cn(
                                            errors[`statuses.${index}.name`] &&
                                                'border-destructive',
                                        )}
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
                                        type="button"
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

                    <Button type="submit">
                        {mode === 'create' && 'Create Board'}
                        {mode === 'edit' && 'Save Changes'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
