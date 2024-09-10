const fs = require('fs');
const {join} = require('path');

const filePath = join(__dirname, 'tasks.json');

const getTasks = () => {
    const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : [];
    try {
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}
const saveTask = (tasks) => fs.writeFileSync(filePath, JSON.stringify(tasks, null, '\t'));

const taskRoute = (app) => {
    app.route('/tasks/:id?')
    .get((req, res) => {
        const tasks = getTasks();
        res.send({tasks});
    })

    .post((req, res) => {
        const tasks = getTasks();
        
        tasks.push(req.body);
        saveTask(tasks);

    
    })
}

module.exports = taskRoute;