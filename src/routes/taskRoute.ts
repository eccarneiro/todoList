import type { Express } from 'express';

export const taskRoute = (app: Express ) => {
    app.route('/tasks/:id?')
    .get((req, res) => {
        console.log(req.params.id);
    })

    .post((req, res) => {
        console.log(req.body);
    })
}