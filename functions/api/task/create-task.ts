import { Request, Response } from 'express';
import taskRepository, { Task, TaskStatus } from '../../repositories/task-repository';
import * as yup from 'yup';

const taskSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().optional(),
    status: yup.mixed().oneOf(Object.values(TaskStatus)).default(TaskStatus.PENDING),
});


async function createTask({ body }: Request, res: Response) {
    let payload: Task;

    try {
        payload = taskSchema.validateSync(body) as Task;
    } catch (e) {
        return res.status(400).json((e as Error).message);
    }

    try {
        const task = await taskRepository.createTask(payload);
    
        return res.status(201).json(task);
    } catch (e) {
        return res.status(500).json((e as Error).message);
    }
}

export default createTask;