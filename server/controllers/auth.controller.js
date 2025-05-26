import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import fetch from 'node-fetch';
import User from '../models/user.model.js';
import { AppError } from '../utils/errorHandler.js';
import logger from '../utils/logger.js';

// Initialize OAuth clients
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT token
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWTSECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Create and send token response
const createSendToken = (user, statusCode, res) => {
  const token = generateToken(user._id, user.role);
  
  // Remove password from output
  user.password = undefined;
  
  res.status(statusCode).json({
    success: true,
    token,
    user
  });
};

const authController = {
  // Register a new user
  register: async (req, res, next) => {
    try {
      const { name, email, password, companyName, role } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(new AppError('User already exists with this email', 400));
      }
      
      // Create new user
      const newUser = await User.create({
        name,
        email,
        password,
        companyName,
        role: role || 'employee'
      });
      
      // Generate verification token
      const verificationToken = newUser.createEmailVerificationToken();
      await newUser.save({ validateBeforeSave: false });
      
      // TODO: Send verification email
      
      createSendToken(newUser, 201, res);
    } catch (error) {
      next(error);
    }
  },
  
  // Login user
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      
      // Check if email and password exist
      if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
      }
      
      // Check if user exists and password is correct
      const user = await User.findOne({ email }).select('+password');
      
      if (!user || !(await user.comparePassword(password))) {
        return next(new AppError('Incorrect email or password', 401));
      }
      
      // Update last login
      user.lastLogin = Date.now();
      await user.save({ validateBeforeSave: false });
      
      createSendToken(user, 200, res);
    } catch (error) {
      next(error);
    }
  },
  
  // Logout user
  logout: async (req, res, next) => {
    try {
      res.status(200).json({
        success: true,
        data: {}
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Check user authority
  checkAuthority: async (req, res, next) => {
    try {
      const { authority } = req.body;
      
      // Check if user has the required authority
      if (req.user.role !== authority && req.user.role !== 'admin') {
        return next(new AppError(`You do not have ${authority} privileges`, 403));
      }
      
      res.status(200).json({
        success: true,
        data: {
          hasAuthority: true
        }
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Forgot password
  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      
      // Get user by email
      const user = await User.findOne({ email });
      if (!user) {
        return next(new AppError('There is no user with this email address', 404));
      }
      
      // Generate reset token
      const resetToken = user.createPasswordResetToken();
      await user.save({ validateBeforeSave: false });
      
      // TODO: Send password reset email
      
      res.status(200).json({
        success: true,
        message: 'Token sent to email'
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Reset password
  resetPassword: async (req, res, next) => {
    try {
      const { token, password } = req.body;
      
      // Hash token
      const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');
      
      // Find user by token
      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
      });
      
      // Check if token is valid and not expired
      if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
      }
      
      // Update password
      user.password = password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      
      createSendToken(user, 200, res);
    } catch (error) {
      next(error);
    }
  },
  
  // Get current user
  getCurrentUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Google OAuth
  googleAuth: async (req, res, next) => {
    try {
      const { tokenId } = req.body;
      
      // Verify Google token
      const ticket = await googleClient.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      
      const { name, email, picture, sub } = ticket.getPayload();
      
      // Check if user exists
      let user = await User.findOne({ email });
      
      // If user doesn't exist, create a new one
      if (!user) {
        user = await User.create({
          name,
          email,
          googleId: sub,
          profilePicture: picture,
          password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8),
          authProvider: 'google',
          emailVerified: true,
          companyName: req.body.companyName || 'Unknown'
        });
      } else if (!user.googleId) {
        // If user exists but doesn't have googleId, update it
        user.googleId = sub;
        user.authProvider = 'google';
        user.emailVerified = true;
        await user.save({ validateBeforeSave: false });
      }
      
      createSendToken(user, 200, res);
    } catch (error) {
      next(error);
    }
  },
  
  // Microsoft OAuth
  microsoftAuth: async (req, res, next) => {
    try {
      const { accessToken } = req.body;
      
      // Fetch user info from Microsoft Graph API
      const response = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      
      if (!response.ok) {
        return next(new AppError('Failed to fetch user from Microsoft', 400));
      }
      
      const userData = await response.json();
      const { displayName, mail, id } = userData;
      
      // Check if user exists
      let user = await User.findOne({ email: mail });
      
      // If user doesn't exist, create a new one
      if (!user) {
        user = await User.create({
          name: displayName,
          email: mail,
          microsoftId: id,
          password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8),
          authProvider: 'microsoft',
          emailVerified: true,
          companyName: req.body.companyName || 'Unknown'
        });
      } else if (!user.microsoftId) {
        // If user exists but doesn't have microsoftId, update it
        user.microsoftId = id;
        user.authProvider = 'microsoft';
        user.emailVerified = true;
        await user.save({ validateBeforeSave: false });
      }
      
      createSendToken(user, 200, res);
    } catch (error) {
      next(error);
    }
  },
  
  // Facebook OAuth
  facebookAuth: async (req, res, next) => {
    try {
      const { accessToken } = req.body;
      
      // Fetch user info from Facebook Graph API
      const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`);
      
      if (!response.ok) {
        return next(new AppError('Failed to fetch user from Facebook', 400));
      }
      
      const userData = await response.json();
      const { name, email, id } = userData;
      
      // Check if user exists
      let user = await User.findOne({ email });
      
      // If user doesn't exist, create a new one
      if (!user) {
        user = await User.create({
          name,
          email,
          facebookId: id,
          password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8),
          authProvider: 'facebook',
          emailVerified: true,
          companyName: req.body.companyName || 'Unknown'
        });
      } else if (!user.facebookId) {
        // If user exists but doesn't have facebookId, update it
        user.facebookId = id;
        user.authProvider = 'facebook';
        user.emailVerified = true;
        await user.save({ validateBeforeSave: false });
      }
      
      createSendToken(user, 200, res);
    } catch (error) {
      next(error);
    }
  },
  
  // OAuth callback
  oauthCallback: async (req, res, next) => {
    try {
      res.redirect(`${process.env.CLIENT_URL}/auth/success`);
    } catch (error) {
      next(error);
    }
  }
};

export default authController;