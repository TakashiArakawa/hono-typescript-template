// tests/app.test.ts
import { describe, it, expect } from 'vitest';
import app from '../src/app.ts';

describe('API Tests', () => {
  describe('GET /', () => {
    it('should return hello message', async () => {
      const res = await app.request('/');

      expect(res.status).toBe(200);
      expect(await res.text()).toBe('Hello from Hono!');
    });
  });

  describe('GET /ping', () => {
    it('should return pong message', async () => {
      const res = await app.request('/ping');

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ message: 'pong' });
    });
  });
});
