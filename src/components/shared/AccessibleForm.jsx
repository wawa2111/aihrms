import React from 'react';

function AccessibleForm({ 
  id, 
  title, 
  description, 
  fields, 
  onSubmit, 
  submitLabel = 'Submit', 
  isSubmitting = false 
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <form 
        id={id} 
        onSubmit={onSubmit} 
        className="space-y-6" 
        aria-labelledby={`${id}-title`}
        aria-describedby={description ? `${id}-description` : undefined}
        noValidate
      >
        {title && (
          <h2 id={`${id}-title`} className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
        )}
        
        {description && (
          <p id={`${id}-description`} className="text-gray-600 dark:text-gray-300">
            {description}
          </p>
        )}
        
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.id}>
              <label 
                htmlFor={field.id} 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {field.label}
                {field.required && (
                  <span aria-label="required" className="text-red-600 ml-1">*</span>
                )}
              </label>
              
              {field.type === 'textarea' ? (
                <textarea
                  id={field.id}
                  name={field.name || field.id}
                  value={field.value}
                  onChange={field.onChange}
                  required={field.required}
                  aria-required={field.required}
                  aria-invalid={field.error ? 'true' : 'false'}
                  aria-describedby={field.hint || field.error ? `${field.id}-hint` : undefined}
                  placeholder={field.placeholder}
                  rows={field.rows || 4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.id}
                  name={field.name || field.id}
                  value={field.value}
                  onChange={field.onChange}
                  required={field.required}
                  aria-required={field.required}
                  aria-invalid={field.error ? 'true' : 'false'}
                  aria-describedby={field.hint || field.error ? `${field.id}-hint` : undefined}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  id={field.id}
                  name={field.name || field.id}
                  value={field.value}
                  onChange={field.onChange}
                  required={field.required}
                  aria-required={field.required}
                  aria-invalid={field.error ? 'true' : 'false'}
                  aria-describedby={field.hint || field.error ? `${field.id}-hint` : undefined}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              )}
              
              {(field.hint || field.error) && (
                <p 
                  id={`${field.id}-hint`} 
                  className={`mt-1 text-sm ${field.error ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  {field.error || field.hint}
                </p>
              )}
            </div>
          ))}
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="w-full py-3 px-4 text-center font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
          >
            {isSubmitting ? 'Submitting...' : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccessibleForm;