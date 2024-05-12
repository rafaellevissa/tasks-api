import { factoryDb } from "./repository";

type Task = {
    id?: number;
    title?: string;
    description?: string;
    createdAt: Date;
}

export const create = async (tableName: string, payload: Task): Promise<Task> => {
    const params = {
        TableName: tableName,
        Item: payload,
    };

    const db = factoryDb();
    
    await db.put(params).promise();
    
    return payload;
}
