import express from 'express';
import type { Express } from 'express';
import { Prisma, PrismaClient } from '@prisma/client'
import { z } from "zod";

const prisma = new PrismaClient()
const app = express();
const port = 3000;

app.use(express.json());

const taskSchemaCreating = z.object({
    title: z.string(),
    content: z.string(),
    progress: z.enum(['ToDo', 'InProgress', 'Done']).optional(),
});

const taskSchemaEdit = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
})

//listar todas as tarefas
app.get('/', async (req, res) => {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
});
//criando uma tarefa
app.post('/tasks', async (req, res) => {
    try {
        const { content, title, progress } = taskSchemaCreating.parse(req.body);
        const task = await prisma.task.create({
            data: {
                title,
                content,
                progress: progress || 'ToDo',
            },
        });
        console.log('Task create ', task);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Unexpected error" });
    }
});
//deletando tarefa
app.delete('/tasks/:id', async (req, res) => {
    try {
        const deletTask = await prisma.task.delete({
            where: {
                id: +req.params.id,
            }
        });
        return res.json(deletTask)
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Unexpected error" });
    }
})

app.patch('/tasks/:id', async (req, res) => {
    try {
        const {content, title} = taskSchemaEdit.parse(req.body);
        const updateTask = await prisma.task.update({
            where: {
                id: +req.params.id,
              },
              data: {
                content,
                title,
              },
        })
        return res.json(updateTask);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Unexpected error" });
    }
})

// orderby : procurar na doc

app.listen(port, () => console.log(`Server is running on port ${port}`));