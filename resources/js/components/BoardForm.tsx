import { cn } from '@/lib/utils';
import { Board, Status } from '@/types/board';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { DropdownMenuItem } from './ui/dropdown-menu';
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
        const newStatus: Status = {
            id: '',
            name: '',
            color: '#9CA3AF',
        };
        setData('statuses', [...data?.statuses, newStatus]);
    };
    const removeStatus = (index: number) => {
        setData(
            'statuses',
            data.statuses.filter((status, i) => i !== index),
        );
    };

    const submit = () => {
        mode === 'create' &&
            post('/boards', {
                onSuccess: () => {
                    setOpen(false);
                    // reset();
                },
                onError: (errors) => {
                    console.log(errors);
                },
            });
        mode === 'edit' &&
            put(`/boards/${board?.id}`, {
                onSuccess: () => {
                    setOpen(false);
                    // reset();
                },
                onError: (errors) => {
                    console.log(errors);
                },
            });
    };

    const [open, setOpen] = useState(false);

    return (
        <Dialog
            key={mode === 'edit' ? board?.id : 'create'}
            open={open}
            onOpenChange={() => {
                reset();
                setOpen(!open);
            }}
        >
            {mode === 'create' && (
                <DialogTrigger className="flex items-center gap-4 py-4 pl-6 text-[15px] font-bold text-primary hover:cursor-pointer">
                    <svg
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-primary"
                    >
                        <path
                            d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                            fill=""
                        />
                    </svg>
                    + Create New Board
                </DialogTrigger>
            )}

            {mode === 'edit' && (
                <DialogTrigger>
                    <DropdownMenuItem
                        className="text-muted"
                        onSelect={(e) => e.preventDefault()}
                    >
                        Edit Board
                    </DropdownMenuItem>
                </DialogTrigger>
            )}

            <DialogContent className="bg-card">
                <DialogHeader className="mb-4">
                    <DialogTitle className="line- text-left text-[18px]">
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

                    <div className="flex flex-col gap-3">
                        <Label>Board Columns</Label>
                        {data.statuses.map((status, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-4"
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

                                    <svg
                                        width="15"
                                        height="15"
                                        xmlns="http://www.w3.org/2000/svg"
                                        onClick={() => removeStatus(index)}
                                        className="fill-[#828FA3] hover:cursor-pointer hover:fill-destructive"
                                    >
                                        <g fill="" fill-rule="evenodd">
                                            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                                            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                                        </g>
                                    </svg>
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
