import { Board } from '@/types/board';
import { router } from '@inertiajs/react';

export const useBoards = () => {
    const createNewBoard = (board: Board) => {
        router.post('/boards', board, {
            onSuccess: () => console.log('Created!'),
            onError: (errors) => console.log(errors),
        });
    };

    return { createNewBoard };
};
