import { useState } from 'react';
import { toast } from 'react-hot-toast';

const AIAssistant = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI HR Assistant. How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([
    'How do I request time off?',
    'What are the company benefits?',
    'How do I update my personal information?',
    'What is the performance review process?',
    'How do I submit an expense report?'
  ]);

  // Handle query submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input and show loading
    setQuery('');
    setIsLoading(true);

    try {
      // In a real implementation, this would call an AI API
      setTimeout(() => {
        const response = generateResponse(userMessage.content);
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to get response');
      setIsLoading(false);
    }
  };

  // Generate a response based on the query
  const generateResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('time off') || lowerQuery.includes('leave') || lowerQuery.includes('vacation')) {
      return "To request time off, go to the 'Leave Management' section in the dashboard. Click on 'New Request', select the dates, type of leave, and submit. Your manager will be notified automatically and you'll receive an email once it's approved.";
    } else if (lowerQuery.includes('benefits') || lowerQuery.includes('insurance') || lowerQuery.includes('healthcare')) {
      return "Our company offers comprehensive benefits including health insurance, dental coverage, vision care, 401(k) matching, and flexible spending accounts. For detailed information, visit the 'Benefits' section under your profile or contact HR at benefits@company.com.";
    } else if (lowerQuery.includes('update') && (lowerQuery.includes('information') || lowerQuery.includes('profile') || lowerQuery.includes('details'))) {
      return "To update your personal information, go to 'My Profile' from the dashboard, click 'Edit Profile', make your changes, and click 'Save'. For sensitive information like banking details, you may need to contact HR directly.";
    } else if (lowerQuery.includes('performance') || lowerQuery.includes('review') || lowerQuery.includes('evaluation')) {
      return "Performance reviews are conducted bi-annually in June and December. The process involves self-assessment, peer feedback, and manager evaluation. You'll receive a notification when it's time to start your self-assessment. The HR system will guide you through each step.";
    } else if (lowerQuery.includes('expense') || lowerQuery.includes('reimbursement')) {
      return "To submit an expense report, go to the 'Finance' section, click 'New Expense Report', upload your receipts, categorize each expense, and submit. Reports are typically processed within 5 business days, and reimbursements are included in your next paycheck.";
    } else {
      return "I don't have specific information on that topic. Please contact HR at hr@company.com or call ext. 1234 for assistance with your query.";
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-3">
          <i className="fas fa-robot text-primary-600 dark:text-primary-400"></i>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">AI HR Assistant</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Powered by advanced AI</p>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-4 ${message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Suggestions */}
      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested questions:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me anything about HR policies..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;