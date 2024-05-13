import { SQS } from 'aws-sdk';

export const factoryQueue = () => {
    const sqsParams = {
        region: process.env.AWS_SQS_REGION,
    };

    return new SQS(sqsParams);
}

export const pushMessage = async (messageBody: any): Promise<void> => {
    const params: SQS.SendMessageRequest = {
        QueueUrl: process.env.AWS_SQS_QUEUE_URL as string,
        MessageBody: JSON.stringify(messageBody)
    };

    const queue = factoryQueue()

    await queue.sendMessage(params).promise();
};