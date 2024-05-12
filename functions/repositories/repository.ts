import { DynamoDB } from 'aws-sdk';

export const factoryDb = () => {
    const connectionParams = {
        region: process.env.AWS_DYNAMODB_REGION,
        endpoint: process.env.AWS_DYNAMODB_ENDPOINT,
    };

    return new DynamoDB.DocumentClient(connectionParams)
}

export const create = async (tableName: string, payload: any): Promise<any> => {
    const params = {
        TableName: tableName,
        Item: {
            ...payload,
            id: Date.now().toString(),
        },
    };

    const db = factoryDb();
    
    await db.put(params).promise();
    
    return payload;
}

export const list = async (tableName: string): Promise<any[]> => {
    const params = {
        TableName: tableName,
    };

    const db = factoryDb();

    const result = await db.scan(params).promise();

    return result.Items || [];
};