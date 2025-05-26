import express from 'express';
import authController from '../controllers/auth.controller.js';
import { validateLogin, validateRegister } from '../middleware/validation.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// Regular authentication routes
router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/logout', authenticate, authController.logout);
router.post('/check-authority', authenticate, authController.checkAuthority);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.get('/me', authenticate, authController.getCurrentUser);

// OAuth routes
router.post('/google', authController.googleAuth);
router.post('/microsoft', authController.microsoftAuth);
router.post('/facebook', authController.facebookAuth);
router.get('/callback', authController.oauthCallback);

export default router;