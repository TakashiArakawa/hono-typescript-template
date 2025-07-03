// src/app.ts
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { userCreateSchema, userUpdateSchema } from './schemas/user.js';
import type { User } from './types/user.js';

const app = new Hono();

// Simple routes
app.get('/', (c) => c.text('Hello from Hono!'));
app.get('/ping', (c) => c.json({ message: 'pong' }));

// In-memory storage for demo
let users: User[] = [];
let nextId = 1;

// User routes with validation
app.post('/users', zValidator('json', userCreateSchema), (c) => {
  const userData = c.req.valid('json');
  const user: User = {
    ...userData,
    id: nextId++,
  };
  users.push(user);
  return c.json({ user }, 201);
});

app.get('/users', (c) => {
  return c.json({ users });
});

app.get('/users/:id', (c) => {
  const id = parseInt(c.req.param('id'));
  const user = users.find((u) => u.id === id);
  if (!user) {
    return c.json({ error: 'User not found' }, 404);
  }
  return c.json({ user });
});

app.put('/users/:id', zValidator('json', userUpdateSchema), (c) => {
  const id = parseInt(c.req.param('id'));
  const userData = c.req.valid('json');
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return c.json({ error: 'User not found' }, 404);
  }

  users[userIndex] = { ...users[userIndex], ...userData };
  return c.json({ user: users[userIndex] });
});

app.delete('/users/:id', (c) => {
  const id = parseInt(c.req.param('id'));
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return c.json({ error: 'User not found' }, 404);
  }

  users.splice(userIndex, 1);
  return c.json({ message: 'User deleted' });
});

export default app;
