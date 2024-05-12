import { Request, Response } from 'express';

async function getTask(req: Request, res: Response) {
    return res.json({});
}

export default getTask;