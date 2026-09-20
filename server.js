const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let todos = [];
let nextId = 1;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const text = (req.body.text || '').trim();
  if (!text) {
    return res.status(400).json({ error: 'text is required' });
  }
  const todo = { id: nextId++, text, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'todo not found' });
  }
  if (typeof req.body.completed === 'boolean') {
    todo.completed = req.body.completed;
  }
  if (typeof req.body.text === 'string' && req.body.text.trim()) {
    todo.text = req.body.text.trim();
  }
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'todo not found' });
  }
  todos.splice(index, 1);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
