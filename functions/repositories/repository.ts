import { DynamoDB } from 'aws-sdk';

export const factoryDb = () => {
    const connectionParams = {
        region: process.env.AWS_DYNAMODB_REGION,
        endpoint: process.env.AWS_DYNAMODB_ENDPOINT,
    };

    return new DynamoDB.DocumentClient(connectionParams)
}