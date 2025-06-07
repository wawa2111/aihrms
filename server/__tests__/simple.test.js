import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index.js';

describe('Simple API Tests', () => {
  it('should respond to health check', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);
    
    expect(response.body.status).toBe('ok');
    expect(response.body.environment).toBeDefined();
  });

  it('should handle 404 for unknown routes', async () => {
    const response = await request(app)
      .get('/api/unknown-route')
      .expect(404);
  });
});
