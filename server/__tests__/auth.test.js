import request from 'supertest';
import app from '../index.js';
import User from '../models/user.model.js';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Auth Controller Tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('OAuth Authentication', () => {
    describe('Google OAuth', () => {
      it('should create a new user when authenticating with Google for the first time', async () => {
        const mockGoogleData = {
          tokenId: 'mock-google-token',
          name: 'Test User',
          email: 'test@gmail.com',
          sub: 'google-123',
          picture: 'profile.jpg'
        };

        const response = await request(app)
          .post('/api/auth/google')
          .send({ tokenId: mockGoogleData.tokenId });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.user.email).toBe(mockGoogleData.email);
        expect(response.body.token).toBeDefined();
      });

      it('should update existing user when authenticating with Google', async () => {
        // Create user first
        const existingUser = await User.create({
          name: 'Existing User',
          email: 'test@gmail.com',
          password: 'password123',
          companyName: 'Test Company'
        });

        const mockGoogleData = {
          tokenId: 'mock-google-token',
          sub: 'google-123'
        };

        const response = await request(app)
          .post('/api/auth/google')
          .send({ tokenId: mockGoogleData.tokenId });

        expect(response.status).toBe(200);
        expect(response.body.user.googleId).toBe(mockGoogleData.sub);
      });
    });

    describe('LinkedIn OAuth', () => {
      it('should create a new user when authenticating with LinkedIn for the first time', async () => {
        const mockLinkedInCode = 'mock-linkedin-code';

        const response = await request(app)
          .post('/api/auth/linkedin')
          .send({ code: mockLinkedInCode });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.token).toBeDefined();
      });

      it('should handle LinkedIn API errors gracefully', async () => {
        const response = await request(app)
          .post('/api/auth/linkedin')
          .send({ code: 'invalid-code' });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
      });
    });

    describe('Facebook OAuth', () => {
      it('should create a new user when authenticating with Facebook for the first time', async () => {
        const mockFacebookToken = 'mock-facebook-token';

        const response = await request(app)
          .post('/api/auth/facebook')
          .send({ accessToken: mockFacebookToken });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.token).toBeDefined();
      });

      it('should handle Facebook API errors gracefully', async () => {
        const response = await request(app)
          .post('/api/auth/facebook')
          .send({ accessToken: 'invalid-token' });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
      });
    });
  });

  describe('Regular Authentication', () => {
    it('should register a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        companyName: 'Test Company'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.user.email).toBe(userData.email);
    });

    it('should login an existing user', async () => {
      // Create user first
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        companyName: 'Test Company'
      };

      await request(app)
        .post('/api/auth/register')
        .send(userData);

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: userData.email,
          password: userData.password
        });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.success).toBe(true);
      expect(loginResponse.body.token).toBeDefined();
    });
  });
});
