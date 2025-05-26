import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ChatbotLoader from './loaders/ChatbotLoader';
import CTAButton from './CTAButton';

const AIAssistantChat = ({ title = "HR Assistant" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your HR Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useSelector(state => state.authentication);
  const isPremium = user?.subscription?.plan === 'premium';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Call AI assistant API
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/insights/chatbot`, 
        { prompt: input },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      // Add AI response to chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.data.data || "I'm sorry, I couldn't process that request."
      }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast.error('Failed to get response from AI assistant');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I encountered an error. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all z-50"
      >
        <i className="fas fa-robot text-xl"></i>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 flex flex-col max-h-[500px]">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
        <h3 className="font-medium flex items-center">
          <i className="fas fa-robot mr-2"></i>
          {title}
        </h3>
        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
          <i className="fas fa-times"></i>
        </button>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto max-h-80">
        {!isPremium && (
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 p-3 rounded-lg mb-4">
            <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">
              <i className="fas fa-crown text-yellow-500 mr-2"></i>
              Upgrade to Premium for unlimited AI assistant usage
            </p>
            <CTAButton 
              text="Upgrade Now" 
              link="/subscription" 
              variant="premium" 
              size="sm" 
            />
          </div>
        )}
        
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`mb-3 ${msg.role === 'user' ? 'text-right' : ''}`}
          >
            <div 
              className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="mb-3">
            <div className="inline-block rounded-lg px-4 py-2 bg-gray-200 dark:bg-gray-700">
              <ChatbotLoader />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSendMessage} className="border-t border-gray-300 dark:border-gray-700 p-3 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          disabled={isLoading || (!isPremium && messages.filter(m => m.role === 'user').length >= 3)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading || !input.trim() || (!isPremium && messages.filter(m => m.role === 'user').length >= 3)}
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
      
      {!isPremium && messages.filter(m => m.role === 'user').length >= 3 && (
        <div className="bg-yellow-100 dark:bg-yellow-900 p-2 text-center text-sm text-yellow-800 dark:text-yellow-200">
          Free message limit reached. <Link to="/subscription" className="underline font-medium">Upgrade now</Link>
        </div>
      )}
    </div>
  );
};

export default AIAssistantChat;