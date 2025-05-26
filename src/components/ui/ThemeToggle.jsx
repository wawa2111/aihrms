import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toggleTheme } from '../../utils/theme';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    // Initialize state based on current theme
    const currentTheme = localStorage.getItem('theme') || 'dark';
    setIsDark(currentTheme === 'dark');
  }, []);
  
  const handleToggle = () => {
    const newTheme = toggleTheme();
    setIsDark(newTheme === 'dark');
  };
  
  return (
    <motion.button
      className="p-2 rounded-full focus:outline-none"
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <motion.i 
          className="fas fa-sun text-yellow-300" 
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        />
      ) : (
        <motion.i 
          className="fas fa-moon text-blue-300"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.button>
  );
}

export default ThemeToggle;