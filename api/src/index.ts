import express from 'express';
import { PrismaClient } from '@prisma/client'
import { z } from "zod";
import cors from "cors";

const prisma = new PrismaClient()
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());

const taskSchemaCreating = z.object({
    title: z.string(),
    content: z.string(),
    progress: z.enum(['ToDo', 'InProgress', 'Done']).optional(),
});

const taskSchemaEdit = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    progress: z.enum(['ToDo', 'InProgress', 'Done']).optional(),
});

const deleteParamsSchema = z.object({
    id: z.number(),
})


//listar todas as tarefas
app.get('/tasks', async (req, res) => {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
});
//criando uma tarefa
app.post('/tasks', async (req, res) => {
    try {
        const result = taskSchemaCreating.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(result.error)
            return
        }
        const { title, content, progress } = result.data;
        const task = await prisma.task.create({
            data: {
                title,
                content,
                progress: progress || 'ToDo',
            },
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Unexpected error" });
    }
});
//deletando tarefa
app.delete('/tasks/:id', async (req, res) => {
    try {
        const result = deleteParamsSchema.safeParse({
            id: Number(req.params.id)
        })
        if (!result.success) {
            res.status(400).json(result.error)
            return
        }
        const { id } = result.data
        try {
            const deleteTask = await prisma.task.delete({
                where: {
                    id,
                }
            });
            return res.json(deleteTask)
        } catch (error) {
            if(error.code === "P2025"){
                res.status(404).json({error:"not found"});
            }else{
                throw error;
            }
        }
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Unexpected error" });
    }
})
//editar as tasks
app.patch('/tasks/:id', async (req, res) => {
    try {
        const result = deleteParamsSchema.safeParse({
            id: Number(req.params.id)
        })
        if (!result.success) {
            res.status(400).json(result.error)
            return
        }
        const { id } = result.data

        const bodyResult = taskSchemaEdit.safeParse(req.body)
        if (!bodyResult.success) {
            res.status(400).json(bodyResult.error)
            return
        }
        const updateTask = await prisma.task.update({
            where: {
                id,
            },
            data: bodyResult.data
        })
        return res.json(updateTask);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Unexpected error" });
    }
})

app.get('/tasks/:id', async (req, res) => {
    try {
        const  id  = req.params.id

        const bodyResult = taskSchemaEdit.safeParse(req.body)
        if (!bodyResult.success) {
            res.status(400).json(bodyResult.error)
            return
        }
        const todo = await prisma.task.findFirst({
            where: {
                id: Number(id)
            },
        })
        return res.json(todo);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Unexpected error" });
    }
})
// orderby : procurar na doc
app.listen(port, () => console.log(`Server is running on port ${port}`));