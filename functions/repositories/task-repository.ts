import { create, findById, list } from "./repository";

export type Task = {
    id?: string;
    title?: string;
    description?: string;
}

const TABLE_NAME = "tasks-table";

const createTask = async (payload: Task): Promise<Task> => create(TABLE_NAME, payload);
const listTask = async (): Promise<Task[]> => list(TABLE_NAME);
const findTask = async (id: string): Promise<Task> => findById(TABLE_NAME, id);

export default {
    createTask,
    listTask,
    findTask,
}