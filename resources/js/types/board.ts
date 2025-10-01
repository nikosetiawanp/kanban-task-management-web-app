// resources/js/types/board.ts
export type Subtask = {
    name: string;
    completed: boolean;
};

export type Task = {
    id: string;
    title: string;
    description: string;
    subtasks: Subtask[];
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
};
