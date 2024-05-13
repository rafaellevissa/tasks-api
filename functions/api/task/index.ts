import serverless from 'serverless-http';
import express from 'express';
import listTask from './list-task';
import getTask from './get-task';
import createTask from './create-task';
import deleteTask from './delete-task';
import updateTask from './update-task';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.get('/task', listTask);
app.get('/task/:id', getTask);
app.post('/task', createTask);
app.delete('/task/:id', deleteTask);
app.put('/task/:id', updateTask);

export const handler = serverless(app);
