// tests/users.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import app from '../src/app.js';

describe('User API Tests', () => {
  beforeEach(async () => {
    // Clear users before each test by making a request to reset state
    // Note: In a real app, you'd have a proper test database setup
  });

  describe('POST /users', () => {
    it('should create a user with valid data', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
      };

      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      expect(res.status).toBe(201);
      const body = await res.json();
      expect(body.user).toMatchObject({
        id: expect.any(Number),
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
      });
    });

    it('should create a user without optional age', async () => {
      const userData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
      };

      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      expect(res.status).toBe(201);
      const body = await res.json();
      expect(body.user).toMatchObject({
        id: expect.any(Number),
        name: 'Jane Doe',
        email: 'jane@example.com',
      });
      expect(body.user.age).toBeUndefined();
    });

    it('should return 400 for missing required fields', async () => {
      const userData = {
        email: 'john@example.com',
      };

      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      expect(res.status).toBe(400);
    });

    it('should return 400 for invalid email format', async () => {
      const userData = {
        name: 'John Doe',
        email: 'invalid-email',
      };

      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      expect(res.status).toBe(400);
    });

    it('should return 400 for negative age', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        age: -5,
      };

      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      expect(res.status).toBe(400);
    });
  });

  describe('GET /users', () => {
    it('should return empty array initially', async () => {
      const res = await app.request('/users');

      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.users).toEqual(expect.any(Array));
    });
  });

  describe('GET /users/:id', () => {
    it('should return 404 for non-existent user', async () => {
      const res = await app.request('/users/999');

      expect(res.status).toBe(404);
      const body = await res.json();
      expect(body.error).toBe('User not found');
    });
  });

  describe('PUT /users/:id', () => {
    it('should return 404 for non-existent user', async () => {
      const updateData = {
        name: 'Updated Name',
      };

      const res = await app.request('/users/999', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      expect(res.status).toBe(404);
      const body = await res.json();
      expect(body.error).toBe('User not found');
    });

    it('should return 400 for invalid update data', async () => {
      const updateData = {
        email: 'invalid-email',
      };

      const res = await app.request('/users/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should return 404 for non-existent user', async () => {
      const res = await app.request('/users/999', {
        method: 'DELETE',
      });

      expect(res.status).toBe(404);
      const body = await res.json();
      expect(body.error).toBe('User not found');
    });
  });
});
