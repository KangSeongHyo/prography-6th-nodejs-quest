import express from 'express';

const app = express();
const todos = require('./router/todos/todo_controller');
const bodyParser = require('body-parser');

app.use('/hello-world', (req, res) => {
  res.send('hello world');
})
app.use(bodyParser.json());
app.use('/todos',todos);
export default app