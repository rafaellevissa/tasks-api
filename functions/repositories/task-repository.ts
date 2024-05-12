import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

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
    
    await dynamoDb.put(params).promise();
    
    return payload;
}