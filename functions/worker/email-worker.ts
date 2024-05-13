import { publishMessage } from "../services";

async function handler(event: any) {
    try {
        for (const record of event.Records) {
          const { from, to, subject, message } = JSON.parse(record.body);

            await publishMessage(from, to, subject, message);
        }
        return { statusCode: 200, body: 'Messages processed successfully' };
    } catch (error) {
        console.error('Error processing messages:', error);
        return { statusCode: 500, body: 'Error processing messages' };
    }
}

export default handler;