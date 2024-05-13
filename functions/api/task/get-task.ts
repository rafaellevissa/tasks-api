import { Request, Response } from 'express';
import taskRepository from '../../repositories/task-repository';

async function getTask({ params }: Request, res: Response) {
    try {
        const task = await taskRepository.findTask(params.id);
    
        return res.status(200).json(task);
    } catch (e) {
        return res.status(500).json((e as Error).message);
    }
}

export default getTask;