import { Request, Response } from 'express';
import taskRepository, { Task } from '../../repositories/task-repository';
import * as yup from 'yup';

const taskSchema = yup.object().shape({
    title: yup.string().optional(),
    description: yup.string().optional(),
    status: yup.bool().optional(),
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
    
        if (body?.status) {
            // publish to email queue
        }

        return res.status(201).json(tasks);
    } catch (e) {
        return res.status(500).json((e as Error).message);
    }
}

export default updateTask;