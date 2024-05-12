import { Request, Response } from 'express';
import taskRepository, { Task } from '../../repositories/task-repository';
import * as yup from 'yup';

const taskSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().optional(),
});


async function createTask({ body }: Request, res: Response) {
    let payload: Task;

    try {
        payload = taskSchema.validateSync(body);
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