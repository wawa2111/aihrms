/**
 * Theme utility functions for managing dark/light mode
 */

// Check if user prefers dark mode or has previously selected it
export const getInitialTheme = () => {
  // Default to dark mode
  return 'dark';
};

// Apply theme to document
export const applyTheme = (theme) => {
  const root = window.document.documentElement;
  
  // Remove old theme class
  root.classList.remove('light', 'dark');
  
  // Add new theme class
  root.classList.add(theme);
  
  // Store theme preference
  localStorage.setItem('theme', theme);
};

// Toggle between light and dark themes
export const toggleTheme = () => {
  const currentTheme = localStorage.getItem('theme') || getInitialTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  applyTheme(newTheme);
  return newTheme;
};