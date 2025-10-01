import { router } from '@inertiajs/react';

export const useStatuses = () => {
    const createManyStatuses = (
        statuses: { name: string; color: string }[],
        boardId: string,
    ) => {
        router.post(`/boards/1/statuses/many`, { statuses });
    };
};
