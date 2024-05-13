import { DynamoDB } from 'aws-sdk';

type ExpressionResult = {
    updateExpression: string;
    expressionAttributeNames: Record<string, any>;
    expressionAttributeValues: Record<string, any>;
}

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

export const findById = async (tableName: string, id: string): Promise<any> => {
    const params = {
        TableName: tableName,
        Key: {
            id: id,
        },
    };

    const db = factoryDb();

    const result = await db.get(params).promise();

    return result.Item;
};

const buildUpdateExpression = (allowFields: string[], payload: Record<string, any>): ExpressionResult => {
    const updateExpressionParts: string[] = [];
    const expressionAttributeValues: Record<string, any> = {};
    const expressionAttributeNames: Record<string, any> = {};

    for (const key in payload) {
        if (Object.hasOwnProperty.call(payload, key) && allowFields.includes(key)) {
            updateExpressionParts.push(`#${key} = :${key}`);
            expressionAttributeNames[`#${key}`] = key;
            expressionAttributeValues[`:${key}`] = payload[key];
        }
    }

    return {
        updateExpression: `SET ${updateExpressionParts.join(', ')}`,
        expressionAttributeNames,
        expressionAttributeValues,
    };
};

export const update = async (tableName: string, id: string, allowFields: string[], payload: any): Promise<any> => {
    const { updateExpression, expressionAttributeNames, expressionAttributeValues } = buildUpdateExpression(allowFields, payload);

    const params = {
        TableName: tableName,
        Key: {
            id: id,
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
    };

    const db = factoryDb();

    const result = await db.update(params).promise();

    return result.Attributes;
};

export const deleteById = async (tableName: string, id: string): Promise<void> => {
    const params = {
        TableName: tableName,
        Key: {
            id: id,
        },
    };
    const db = factoryDb();

    await db.delete(params).promise();
};
