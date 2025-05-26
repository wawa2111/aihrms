import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const AIAssistant = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your HR assistant. How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector(state => state.authentication);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input
    setQuery('');
    setIsLoading(true);

    try {
      // Simulate AI response (in a real app, this would call an API)
      setTimeout(() => {
        const aiResponses = {
          leave: "To apply for leave, go to the Leave Management section and click on 'Request Leave'. Fill in the required details and submit your request.",
          salary: "Your salary information can be found in the Payroll section. If you have specific questions about your compensation, please contact HR directly.",
          attendance: "You can mark your attendance using the QR code scanner in the Attendance section. Make sure you're within the office premises when checking in.",
          default: "I'm not sure how to help with that specific query. Could you provide more details or ask something related to HR policies, leave, attendance, or payroll?"
        };

        const lowerQuery = userMessage.content.toLowerCase();
        let responseContent = aiResponses.default;

        if (lowerQuery.includes('leave') || lowerQuery.includes('vacation') || lowerQuery.includes('day off')) {
          responseContent = aiResponses.leave;
        } else if (lowerQuery.includes('salary') || lowerQuery.includes('pay') || lowerQuery.includes('compensation')) {
          responseContent = aiResponses.salary;
        } else if (lowerQuery.includes('attendance') || lowerQuery.includes('check in') || lowerQuery.includes('present')) {
          responseContent = aiResponses.attendance;
        }

        setMessages(prev => [...prev, { role: 'assistant', content: responseContent }]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to get response from AI assistant');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">HR Assistant</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Ask me anything about HR policies</p>
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
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question..."
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