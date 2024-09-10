const taskRoute = require('./routes/taskRoute');
const express = require('express');
const app = express();
const port = 3000;

taskRoute(app);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.listen(port, () => console.log(`Server is running on port ${port}`));
