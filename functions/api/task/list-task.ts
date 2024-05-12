import { Request, Response } from 'express';
import taskRepository from '../../repositories/task-repository';

async function listTask(_: Request, res: Response) {
    try {
        const tasks = await taskRepository.listTask();
    
        return res.status(201).json(tasks);
    } catch (e) {
        return res.status(500).json((e as Error).message);
    }
}

export default listTask;