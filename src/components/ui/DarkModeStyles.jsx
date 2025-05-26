import { useEffect } from 'react';

/**
 * Component to apply dark mode styles to the document
 * This ensures dark mode is applied immediately on page load
 */
function DarkModeStyles() {
  useEffect(() => {
    // Add dark mode class to html element
    document.documentElement.classList.add('dark');
    
    // Set dark mode preference in localStorage
    localStorage.setItem('theme', 'dark');
    
    // Apply dark background to body
    document.body.classList.add('bg-gray-900');
    
    // Apply dark scrollbar styles
    const style = document.createElement('style');
    style.textContent = `
      ::-webkit-scrollbar {
        width: 10px;
      }
      
      ::-webkit-scrollbar-track {
        background: #1f2937;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #4b5563;
        border-radius: 5px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #6b7280;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
}

export default DarkModeStyles;