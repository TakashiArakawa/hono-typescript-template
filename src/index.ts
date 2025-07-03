// src/index.ts
import { serve } from '@hono/node-server';
import app from './app.ts';

serve({ fetch: app.fetch, port: 3000 });
