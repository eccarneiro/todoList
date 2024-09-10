const pg = require('pg');

const task = new pg.Task({
    user: 'postgres',
    host: 'localhost',
    database: 'todoDb',
    password: 'admin',
    port: 5432,
});

module.exports = task;