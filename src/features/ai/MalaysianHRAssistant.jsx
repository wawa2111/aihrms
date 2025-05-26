import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const MalaysianHRAssistant = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your Malaysian HR Assistant. I can help with Malaysian employment laws, regulatory compliance, and HR best practices. How can I assist you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([
    'What are the key provisions of the Employment Act 1955?',
    'How do I calculate overtime pay in Malaysia?',
    'What are the maternity leave requirements?',
    'Explain SOCSO and EPF contributions',
    'What are the termination procedures in Malaysia?'
  ]);

  // Malaysian HR knowledge base
  const hrKnowledge = {
    'employment_act': 'The Employment Act 1955 is the main legislation governing employment in Peninsular Malaysia. It covers employees with wages up to RM2,000 and certain categories of employees irrespective of wages. Key provisions include working hours (max 8 hours/day, 48 hours/week), overtime rates (1.5x normal rate), annual leave (8-16 days based on years of service), sick leave (14-60 days based on years of service), and public holidays (at least 11 days).',
    
    'overtime': 'In Malaysia, overtime is calculated at 1.5 times the hourly rate for normal working days, 2 times for rest days, and 3 times for public holidays. The formula for hourly rate is: Monthly salary × 12 ÷ 52 ÷ normal working hours per week. Overtime is capped at 104 hours per month as per Employment (Amendment) Act 2022.',
    
    'maternity': 'Under the Employment Act (Amendment) 2022, female employees are entitled to 98 consecutive days (14 weeks) of paid maternity leave. This applies to all female employees regardless of wage level. Employers are prohibited from terminating a pregnant employee except due to misconduct, willful breach of contract, or closure of business.',
    
    'socso_epf': 'SOCSO (Social Security Organization) provides social security protection for employees. Contribution rates: Employees contribute 0.5% of wages, employers contribute 1.75%. EPF (Employees Provident Fund) is a retirement savings scheme. For employees aged below 60: employees contribute 11% of wages, employers contribute 13% for wages ≤RM5,000 and 12% for wages >RM5,000.',
    
    'termination': 'Termination procedures in Malaysia require proper notice as specified in the employment contract or statutory minimum (4-8 weeks based on years of service). Termination benefits include: termination indemnity (10-20 days' wages per year of service for employees with <5 years service), retirement benefits (similar scale for employees ≥5 years service), and payment in lieu of notice if applicable.',
    
    'industrial_relations': 'The Industrial Relations Act 1967 governs employer-employee relations, trade unions, and dispute resolution. Unfair dismissal claims can be filed with the Industrial Relations Department within 60 days of dismissal. The Industrial Court has jurisdiction over trade disputes and unfair dismissal cases.',
    
    'minimum_wage': 'As of May 1, 2022, Malaysia\'s minimum wage is RM1,500 per month or RM7.21 per hour. This applies nationwide to all employers regardless of the number of employees.',
    
    'sexual_harassment': 'The Employment Act Amendment 2022 strengthened provisions against sexual harassment. Employers must address complaints within 30 days and can face penalties up to RM50,000 for non-compliance. The Anti-Sexual Harassment Act 2022 established a tribunal for sexual harassment cases.',
    
    'foreign_workers': 'Employers must obtain approval from relevant government agencies before hiring foreign workers. Foreign workers must have valid work permits (Employment Pass for professionals, Temporary Employment Pass for semi/unskilled workers). Employers must provide insurance coverage and accommodation that meets minimum standards.',
    
    'covid_regulations': 'Post-pandemic regulations include workplace safety guidelines under NADOPOD (Notification of Accident, Dangerous Occurrence, Occupational Poisoning and Occupational Disease) Regulations 2004. Employers must report COVID-19 cases contracted at workplace to DOSH (Department of Occupational Safety and Health).'
  };

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
      // Process query against Malaysian HR knowledge base
      setTimeout(() => {
        const response = processQuery(userMessage.content);
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to get response');
      setIsLoading(false);
    }
  };

  // Process query against knowledge base
  const processQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Check for specific topics
    if (lowerQuery.includes('employment act') || lowerQuery.includes('labor law') || lowerQuery.includes('labour law')) {
      return hrKnowledge.employment_act;
    } else if (lowerQuery.includes('overtime') || lowerQuery.includes('extra hours')) {
      return hrKnowledge.overtime;
    } else if (lowerQuery.includes('maternity') || lowerQuery.includes('pregnant') || lowerQuery.includes('pregnancy leave')) {
      return hrKnowledge.maternity;
    } else if (lowerQuery.includes('socso') || lowerQuery.includes('epf') || lowerQuery.includes('contribution') || lowerQuery.includes('provident fund')) {
      return hrKnowledge.socso_epf;
    } else if (lowerQuery.includes('termination') || lowerQuery.includes('fire') || lowerQuery.includes('dismiss') || lowerQuery.includes('layoff')) {
      return hrKnowledge.termination;
    } else if (lowerQuery.includes('industrial relations') || lowerQuery.includes('trade union') || lowerQuery.includes('dispute')) {
      return hrKnowledge.industrial_relations;
    } else if (lowerQuery.includes('minimum wage') || lowerQuery.includes('minimum salary')) {
      return hrKnowledge.minimum_wage;
    } else if (lowerQuery.includes('sexual harassment') || lowerQuery.includes('harassment')) {
      return hrKnowledge.sexual_harassment;
    } else if (lowerQuery.includes('foreign') || lowerQuery.includes('expatriate') || lowerQuery.includes('work permit')) {
      return hrKnowledge.foreign_workers;
    } else if (lowerQuery.includes('covid') || lowerQuery.includes('pandemic')) {
      return hrKnowledge.covid_regulations;
    }
    
    // Generic response for queries not matching specific topics
    return "I don't have specific information on that topic. Malaysian HR regulations are primarily governed by the Employment Act 1955 (as amended), Industrial Relations Act 1967, Minimum Wages Order, and various other regulations. For this specific query, I recommend consulting with the Malaysian Department of Labour or a qualified HR professional familiar with Malaysian employment law.";
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-3">
          <i className="fas fa-user-tie text-primary-600 dark:text-primary-400"></i>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Malaysian HR Assistant</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Specialized in Malaysian employment laws and regulations</p>
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
            placeholder="Ask about Malaysian HR laws and regulations..."
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

export default MalaysianHRAssistant;