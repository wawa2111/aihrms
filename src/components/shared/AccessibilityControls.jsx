import { useState } from 'react';

function AccessibilityControls() {
  const [fontSize, setFontSize] = useState('normal');
  const [contrast, setContrast] = useState('normal');
  
  const changeFontSize = (size) => {
    const html = document.documentElement;
    
    // Remove existing font size classes
    html.classList.remove('text-sm', 'text-base', 'text-lg', 'text-xl');
    
    // Add new font size class
    if (size === 'small') {
      html.classList.add('text-sm');
      setFontSize('small');
    } else if (size === 'normal') {
      html.classList.add('text-base');
      setFontSize('normal');
    } else if (size === 'large') {
      html.classList.add('text-lg');
      setFontSize('large');
    } else if (size === 'x-large') {
      html.classList.add('text-xl');
      setFontSize('x-large');
    }
  };
  
  const changeContrast = (contrastMode) => {
    const html = document.documentElement;
    
    // Remove existing contrast classes
    html.classList.remove('high-contrast');
    
    // Add new contrast class
    if (contrastMode === 'high') {
      html.classList.add('high-contrast');
      setContrast('high');
    } else {
      setContrast('normal');
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Accessibility Controls
      </h2>
      
      <div className="space-y-4">
        <div>
          <label id="font-size-label" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Text Size
          </label>
          <div className="flex flex-wrap gap-2" role="group" aria-labelledby="font-size-label">
            <button
              onClick={() => changeFontSize('small')}
              className={`px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fontSize === 'small' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              aria-pressed={fontSize === 'small'}
            >
              Small
            </button>
            <button
              onClick={() => changeFontSize('normal')}
              className={`px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fontSize === 'normal' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              aria-pressed={fontSize === 'normal'}
            >
              Normal
            </button>
            <button
              onClick={() => changeFontSize('large')}
              className={`px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fontSize === 'large' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              aria-pressed={fontSize === 'large'}
            >
              Large
            </button>
            <button
              onClick={() => changeFontSize('x-large')}
              className={`px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fontSize === 'x-large' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              aria-pressed={fontSize === 'x-large'}
            >
              Extra Large
            </button>
          </div>
        </div>
        
        <div>
          <label id="contrast-label" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Contrast
          </label>
          <div className="flex flex-wrap gap-2" role="group" aria-labelledby="contrast-label">
            <button
              onClick={() => changeContrast('normal')}
              className={`px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                contrast === 'normal' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              aria-pressed={contrast === 'normal'}
            >
              Normal Contrast
            </button>
            <button
              onClick={() => changeContrast('high')}
              className={`px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                contrast === 'high' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              aria-pressed={contrast === 'high'}
            >
              High Contrast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessibilityControls;