import AppLayout from '@/layouts/AppLayout';
import { Board } from '@/types/board';

type BoardProps = {
    id: string;
    name: string;
};

export default function Index({ board }: { board: Board }) {
    return (
        <AppLayout board={board}>
            <div className="flex h-full w-full flex-col items-center justify-center gap-8">
                <span>
                    No board is selected. Please select a board from the sidebar
                    or create a new one to get started.
                </span>

                {/* <BoardForm mode="create" /> */}
            </div>
        </AppLayout>
    );
}
