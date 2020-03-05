import express from 'express';

const app = express();
const todos = require('./router/todos/todo_controller');
const bodyParser = require('body-parser');
const models = require("./models/index");

app.use(bodyParser.json());
app.use('/todos',todos);

models.sequelize.sync().then(()=>{});

export default app