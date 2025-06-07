import React from 'react';

function AccessibleHRChart({ title, data, type = 'bar', ariaLabel }) {
  // Calculate max value for scaling
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{title}</h3>
      
      {/* Accessible chart with proper ARIA attributes */}
      <div 
        role="img" 
        aria-label={ariaLabel || title} 
        className="mt-4"
      >
        <div className="sr-only">
          {data.map((item, index) => (
            <p key={index}>
              {item.label}: {item.value} {item.unit || ''}
            </p>
          ))}
        </div>
        
        {type === 'bar' && (
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 w-24 mr-2">
                  {item.label}
                </span>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div 
                      className={`${item.color || 'bg-blue-600'} h-4 rounded-full`} 
                      style={{ width: `${(item.value / maxValue) * 100}%` }}
                      role="presentation"
                    ></div>
                  </div>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 w-12 text-right">
                  {item.value}{item.unit || ''}
                </span>
              </div>
            ))}
          </div>
        )}
        
        {type === 'pie' && (
          <div className="flex flex-col items-center">
            <div className="relative h-48 w-48">
              {/* This is a simplified pie chart representation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-32 w-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Pie Chart
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              {data.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className={`h-3 w-3 rounded-full ${item.color || 'bg-blue-600'} mr-2`}
                    aria-hidden="true"
                  ></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {item.label}: {item.value}{item.unit || ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Table representation for screen readers */}
      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th scope="row">{item.label}</th>
              <td>{item.value}{item.unit || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccessibleHRChart;