import { Request, Response } from 'express';
import taskRepository, { Task, TaskStatus } from '../../repositories/task-repository';
import * as yup from 'yup';
import { pushMessage } from '../../services';

const taskSchema = yup.object().shape({
    title: yup.string().optional(),
    description: yup.string().optional(),
    status: yup.mixed().oneOf(Object.values(TaskStatus)).optional(),
});

async function updateTask({ params, body }: Request, res: Response) {
    let payload: Task;

    try {
        payload = taskSchema.validateSync(body) as Task;
    } catch (e) {
        return res.status(400).json((e as Error).message);
    }

    try {
        const tasks = await taskRepository.updateTask(params.id, payload);
    
        if (tasks?.status === TaskStatus.DONE) {
            await pushMessage({
                message: `Task '${params.id}' is done.`,
                to: process.env.AWS_SQS_EMAIL_NOTIFICATION,
                from: process.env.AWS_SQS_EMAIL_NOTIFICATION,
                subject: "Task notification"
            });
        }

        return res.status(200).json(tasks);
    } catch (e) {
        return res.status(500).json((e as Error).message);
    }
}

export default updateTask;