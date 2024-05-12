import { create, list } from "./repository";

export type Task = {
    id?: number;
    title?: string;
    description?: string;
}

const TABLE_NAME = "tasks-table";

const createTask = async (payload: Task): Promise<Task> => create(TABLE_NAME, payload);
const listTask = async (): Promise<Task[]> => list(TABLE_NAME);

export default {
    createTask,
    listTask,
}