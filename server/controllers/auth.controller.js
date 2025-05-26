import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import fetch from 'node-fetch';
// Import User model (to be implemented)

dotenv.config();

// Initialize OAuth clients
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authController = {
  // Register a new user
  register: async (req, res) => {
    try {
      const { name, email, password, companyName, role } = req.body;
      
      // Check if user already exists
      // const existingUser = await User.findOne({ email });
      // if (existingUser) {
      //   return res.status(400).json({ success: false, message: 'User already exists' });
      // }
      
      // Hash password
      const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT_ROUNDS) || 10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Create new user
      // const newUser = await User.create({
      //   name,
      //   email,
      //   password: hashedPassword,
      //   companyName,
      //   role
      // });
      
      // Generate token
      const token = jwt.sign(
        { id: 'newUser._id', role },
        process.env.JWTSECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );
      
      // For demo purposes, create a mock user
      const user = {
        _id: '123456789',
        name,
        email,
        companyName,
        role
      };
      
      res.status(201).json({
        success: true,
        data: {
          token,
          user
        }
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },
  
  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Check if user exists
      // const user = await User.findOne({ email });
      // if (!user) {
      //   return res.status(400).json({ success: false, message: 'Invalid credentials' });
      // }
      
      // Check password
      // const isMatch = await bcrypt.compare(password, user.password);
      // if (!isMatch) {
      //   return res.status(400).json({ success: false, message: 'Invalid credentials' });
      // }
      
      // Generate token
      const token = jwt.sign(
        { id: '123456789', role: 'admin' },
        process.env.JWTSECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );
      
      // For demo purposes, create a mock user
      const user = {
        _id: '123456789',
        name: 'Demo User',
        email,
        companyName: 'Demo Company',
        role: 'admin'
      };
      
      res.status(200).json({
        success: true,
        data: {
          token,
          user
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },
  
  // Logout user
  logout: async (req, res) => {
    try {
      // In a real implementation, you might invalidate the token
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },
  
  // Check authority
  checkAuthority: async (req, res) => {
    try {
      const { id, authority } = req.body;
      
      // In a real implementation, you would check if the user has the specified authority
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Check authority error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },
  
  // Forgot password
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      
      // Check if user exists
      // const user = await User.findOne({ email });
      // if (!user) {
      //   return res.status(404).json({ success: false, message: 'User not found' });
      // }
      
      // Generate reset token
      const resetToken = jwt.sign(
        { email },
        process.env.JWTSECRET,
        { expiresIn: '1h' }
      );
      
      // Send email with reset link
      // await sendResetEmail(email, resetToken);
      
      res.status(200).json({
        success: true,
        message: 'Password reset link sent to your email'
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },
  
  // Reset password
  resetPassword: async (req, res) => {
    try {
      const { token, password } = req.body;
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWTSECRET);
      
      // Hash new password
      const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT_ROUNDS) || 10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Update user password
      // await User.findOneAndUpdate(
      //   { email: decoded.email },
      //   { password: hashedPassword }
      // );
      
      res.status(200).json({
        success: true,
        message: 'Password reset successful'
      });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },
  
  // Get current user
  getCurrentUser: async (req, res) => {
    try {
      // In a real implementation, you would fetch the user from the database
      const user = {
        _id: '123456789',
        name: 'Demo User',
        email: 'demo@example.com',
        companyName: 'Demo Company',
        role: 'admin'
      };
      
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },
  
  // Google OAuth
  googleAuth: async (req, res) => {
    try {
      const { tokenId } = req.body;
      
      // Verify Google token
      const ticket = await googleClient.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      
      const { name, email, picture } = ticket.getPayload();
      
      // Check if user exists
      // let user = await User.findOne({ email });
      
      // If user doesn't exist, create a new one
      // if (!user) {
      //   user = await User.create({
      //     name,
      //     email,
      //     profilePicture: picture,
      //     password: '', // No password for OAuth users
      //     authProvider: 'google'
      //   });
      // }
      
      // Generate token
      const token = jwt.sign(
        { id: '123456789', role: 'user' },
        process.env.JWTSECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );
      
      // For demo purposes, create a mock user
      const user = {
        _id: '123456789',
        name,
        email,
        profilePicture: picture,
        role: 'user'
      };
      
      res.status(200).json({
        success: true,
        data: {
          token,
          user
        }
      });
    } catch (error) {
      console.error('Google auth error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },
  
  // Microsoft OAuth
  microsoftAuth: async (req, res) => {
    try {
      const { accessToken } = req.body;
      
      // Fetch user info from Microsoft Graph API
      const response = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user from Microsoft');
      }
      
      const userData = await response.json();
      const { displayName, mail, id } = userData;
      
      // Check if user exists
      // let user = await User.findOne({ email: mail });
      
      // If user doesn't exist, create a new one
      // if (!user) {
      //   user = await User.create({
      //     name: displayName,
      //     email: mail,
      //     password: '', // No password for OAuth users
      //     authProvider: 'microsoft',
      //     microsoftId: id
      //   });
      // }
      
      // Generate token
      const token = jwt.sign(
        { id: '123456789', role: 'user' },
        process.env.JWTSECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );
      
      // For demo purposes, create a mock user
      const user = {
        _id: '123456789',
        name: displayName,
        email: mail,
        role: 'user'
      };
      
      res.status(200).json({
        success: true,
        data: {
          token,
          user
        }
      });
    } catch (error) {
      console.error('Microsoft auth error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },
  
  // Facebook OAuth
  facebookAuth: async (req, res) => {
    try {
      const { accessToken } = req.body;
      
      // Fetch user info from Facebook Graph API
      const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user from Facebook');
      }
      
      const userData = await response.json();
      const { name, email, id } = userData;
      
      // Check if user exists
      // let user = await User.findOne({ email });
      
      // If user doesn't exist, create a new one
      // if (!user) {
      //   user = await User.create({
      //     name,
      //     email,
      //     password: '', // No password for OAuth users
      //     authProvider: 'facebook',
      //     facebookId: id
      //   });
      // }
      
      // Generate token
      const token = jwt.sign(
        { id: '123456789', role: 'user' },
        process.env.JWTSECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );
      
      // For demo purposes, create a mock user
      const user = {
        _id: '123456789',
        name,
        email,
        role: 'user'
      };
      
      res.status(200).json({
        success: true,
        data: {
          token,
          user
        }
      });
    } catch (error) {
      console.error('Facebook auth error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },
  
  // OAuth callback
  oauthCallback: async (req, res) => {
    try {
      // Handle OAuth callback
      res.redirect(`${process.env.CLIENT_URL}/auth/success`);
    } catch (error) {
      console.error('OAuth callback error:', error);
      res.redirect(`${process.env.CLIENT_URL}/auth/error`);
    }
  }
};

export default authController;