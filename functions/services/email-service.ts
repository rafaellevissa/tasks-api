import { SES } from 'aws-sdk';

export const factoryEmail = () => {
    return new SES();
}

export const publishMessage = async (from: string, to: string, subject: string, message: string): Promise<void> => {
    const params: AWS.SES.SendEmailRequest = {
        Destination: {
        ToAddresses: [to],
        },
        Message: {
            Body: {
                Text: {
                Charset: 'UTF-8',
                Data: message,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject,
            }, 
        },
        Source: from,
    };

    const email = factoryEmail()

    await email.sendEmail(params).promise();
};