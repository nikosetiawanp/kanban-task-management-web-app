// resources/js/types/board.ts
export type Subtask = {
    id?: string;
    name: string;
    completed: boolean;
};

export type Task = {
    id: string;
    title: string;
    description: string;
    subtasks: Subtask[];
    statusId?: string;
    status_id?: string;
};

export type Status = {
    id?: string;
    name: string;
    color: string;
    tasks?: Task[];
};

export type Board = {
    id: string;
    name: string;
    statuses: Status[];
    boardId?: string;
    board_id?: string;
};
