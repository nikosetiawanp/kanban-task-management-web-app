import { router, usePage } from '@inertiajs/react';

type BoardProps = {
    id: string;
    name: string;
};

export default function Index() {
    const { boards } = usePage<{ boards: BoardProps[] }>().props;
    return (
        <div className="flex">
            <Sidebar boards={boards} />
        </div>
    );
}

function Sidebar({ boards }: { boards: BoardProps[] }) {
    return (
        <div className="flex w-[300px] flex-col gap-4">
            <span>ALL BOARDS ({boards.length})</span>
            {boards.map((board) => {
                return (
                    <div className="flex gap-4">
                        <span>{board.name}</span>
                        <button
                            onClick={() => router.delete('/boards/' + board.id)}
                        >
                            del
                        </button>
                    </div>
                );
            })}
            <button
                onClick={() => router.post('/boards', { name: 'New Board' })}
                className="rounded-full bg-white px-4 py-2 text-black"
            >
                + Create New Board
            </button>
        </div>
    );
}
