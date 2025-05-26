import { useState } from 'react';
import { toast } from 'react-hot-toast';

const AILeaveManagement = () => {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [showSuggestion, setShowSuggestion] = useState(false);

  // Sample team members data
  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'Frontend Developer', availability: 0.8 },
    { id: 2, name: 'Jane Smith', role: 'Backend Developer', availability: 0.9 },
    { id: 3, name: 'Mike Johnson', role: 'UI/UX Designer', availability: 0.7 },
    { id: 4, name: 'Sarah Williams', role: 'Project Manager', availability: 0.5 },
    { id: 5, name: 'Alex Brown', role: 'QA Engineer', availability: 0.95 },
  ];

  // Calculate days between two dates
  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  // Generate AI suggestion for substitute
  const generateAiSuggestion = () => {
    if (!startDate || !endDate || !leaveType) {
      toast.error('Please fill in leave type, start date and end date');
      return;
    }

    setIsSubmitting(true);

    // Simulate AI processing
    setTimeout(() => {
      const days = calculateDays(startDate, endDate);
      
      // Sort team members by availability (highest first)
      const sortedMembers = [...teamMembers].sort((a, b) => b.availability - a.availability);
      
      // Select the most available team member
      const substitute = sortedMembers[0];
      
      setAiSuggestion({
        substitute,
        days,
        workloadDistribution: sortedMembers.slice(0, 3).map(member => ({
          member,
          percentage: Math.round((member.availability / sortedMembers.slice(0, 3).reduce((sum, m) => sum + m.availability, 0)) * 100)
        }))
      });
      
      setShowSuggestion(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!leaveType || !startDate || !endDate || !reason) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Leave request submitted successfully');
      setIsSubmitting(false);
      
      // Reset form
      setLeaveType('');
      setStartDate('');
      setEndDate('');
      setReason('');
      setAiSuggestion(null);
      setShowSuggestion(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Request Leave</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Leave Type*
                </label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select Leave Type</option>
                  <option value="sick">Sick Leave</option>
                  <option value="vacation">Vacation</option>
                  <option value="personal">Personal Leave</option>
                  <option value="maternity">Maternity/Paternity Leave</option>
                  <option value="bereavement">Bereavement Leave</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Leave Balance
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Sick</div>
                    <div className="font-semibold text-gray-800 dark:text-white">12 days</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Vacation</div>
                    <div className="font-semibold text-gray-800 dark:text-white">15 days</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Personal</div>
                    <div className="font-semibold text-gray-800 dark:text-white">5 days</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date*
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date*
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reason*
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="Please provide a reason for your leave request"
                required
              ></textarea>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={generateAiSuggestion}
                disabled={isSubmitting || !startDate || !endDate || !leaveType}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
              >
                <i className="fas fa-robot mr-2"></i>
                Generate AI Suggestion
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div>
        {showSuggestion && aiSuggestion ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">AI Recommendation</h3>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-full">
                AI Generated
              </span>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Based on your team's current workload and availability, here's our recommendation:
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-800 dark:text-white">
                      {aiSuggestion.substitute.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {aiSuggestion.substitute.role}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Availability:</span> {aiSuggestion.substitute.availability * 100}%
                </div>
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <p>
                  <span className="font-medium">Leave Duration:</span> {aiSuggestion.days} days
                </p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Workload Distribution
                </h4>
                
                {aiSuggestion.workloadDistribution.map((item, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>{item.member.name}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400 italic">
              This recommendation is based on AI analysis of team workload, project deadlines, and individual expertise.
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 mb-4">
              <i className="fas fa-robot text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">AI Recommendations</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Fill in your leave details and click "Generate AI Suggestion" to get intelligent recommendations for workload distribution during your absence.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AILeaveManagement;