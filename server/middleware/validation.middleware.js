// Validate login request
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email' });
  }
  
  next();
};

// Validate register request
export const validateRegister = (req, res, next) => {
  const { name, email, password, companyName } = req.body;
  
  if (!name || !email || !password || !companyName) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email' });
  }
  
  // Validate password strength
  if (password.length < 8) {
    return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
  }
  
  next();
};