import express from 'express';
import { PrismaClient } from '@prisma/client'
import { taskRoute } from './routes/taskRoute';
const prisma = new PrismaClient()

const app = express();
const port = 3000;

taskRoute(app);

app.use(express.json());
app.get('/', async (req, res) => {
    const newUser = await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'teste@gmail.com',
            lastName: 'Silva',
            password: '123456',
        }
    })
    const users = await prisma.user.findMany();
    res.json(users);
});
app.listen(port, () => console.log(`Server is running on port ${port}`));