import { create, deleteById, findById, list, update } from "./repository";

export enum TaskStatus {
    PENDING = "pending",
    DONE = "done",
}

export type Task = {
    id?: string;
    title?: string;
    description?: string;
    status?: TaskStatus;
}

const TABLE_NAME = "tasks-table";

const createTask = async (payload: Task): Promise<Task> => create(TABLE_NAME, payload);
const listTask = async (): Promise<Task[]> => list(TABLE_NAME);
const findTask = async (id: string): Promise<Task> => findById(TABLE_NAME, id);
const updateTask = async (id: string, payload: Task): Promise<Task> => {
    const allowFields =["title", "description", "status"];

    return update(
        TABLE_NAME,
        id,
        allowFields,
        payload,
    );
}
const deleteTask = async (id: string): Promise<void> => deleteById(TABLE_NAME, id);


export default {
    createTask,
    listTask,
    findTask,
    updateTask,
    deleteTask,
}