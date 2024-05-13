import { Request, Response } from 'express';
import taskRepository from '../../repositories/task-repository';

async function deleteTask({ params }: Request, res: Response) {
    try {
        console.log(params.id)
        const task = await taskRepository.deleteTask(params.id);
    
        return res.status(200).json(task);
    } catch (e) {
        return res.status(500).json((e as Error).message);
    }
}

export default deleteTask;