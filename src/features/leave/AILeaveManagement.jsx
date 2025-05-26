import { useState } from 'react';
import { toast } from 'react-hot-toast';

const AILeaveManagement = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([
    { 
      id: 'LR-2023-001', 
      type: 'Annual Leave', 
      startDate: '2023-11-20', 
      endDate: '2023-11-24', 
      days: 5, 
      reason: 'Family vacation', 
      status: 'Approved',
      approver: 'John Smith',
      substitute: 'Sarah Johnson'
    },
    { 
      id: 'LR-2023-002', 
      type: 'Sick Leave', 
      startDate: '2023-10-05', 
      endDate: '2023-10-06', 
      days: 2, 
      reason: 'Fever', 
      status: 'Approved',
      approver: 'John Smith',
      substitute: 'Mike Williams'
    },
    { 
      id: 'LR-2023-003', 
      type: 'Emergency Leave', 
      startDate: '2023-09-15', 
      endDate: '2023-09-15', 
      days: 1, 
      reason: 'Family emergency', 
      status: 'Approved',
      approver: 'John Smith',
      substitute: 'Sarah Johnson'
    }
  ]);
  
  const [leaveBalance, setLeaveBalance] = useState({
    annual: { total: 14, used: 5, remaining: 9 },
    sick: { total: 14, used: 2, remaining: 12 },
    emergency: { total: 7, used: 1, remaining: 6 },
    maternity: { total: 98, used: 0, remaining: 98 },
    paternity: { total: 7, used: 0, remaining: 7 },
    unpaid: { total: 30, used: 0, remaining: 30 }
  });
  
  const [formData, setFormData] = useState({
    type: 'Annual Leave',
    startDate: '',
    endDate: '',
    reason: '',
    substituteRequired: true
  });
  
  const [aiRecommendation, setAiRecommendation] = useState(null);
  const [showRecommendation, setShowRecommendation] = useState(false);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear AI recommendation when form changes
    setShowRecommendation(false);
  };
  
  // Calculate number of days between two dates
  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    // Count only working days (Monday to Friday)
    let workingDays = 0;
    for (let i = 0; i < diffDays; i++) {
      const day = new Date(start);
      day.setDate(day.getDate() + i);
      const dayOfWeek = day.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workingDays++;
      }
    }
    
    return workingDays;
  };
  
  // Get AI recommendation
  const getRecommendation = () => {
    if (!formData.startDate || !formData.endDate) {
      toast.error('Please select start and end dates');
      return;
    }
    
    setShowRecommendation(true);
    
    // Calculate days
    const days = calculateDays(formData.startDate, formData.endDate);
    
    // Check if there are any overlapping leave requests
    const isOverlapping = leaveRequests.some(request => {
      const requestStart = new Date(request.startDate);
      const requestEnd = new Date(request.endDate);
      const formStart = new Date(formData.startDate);
      const formEnd = new Date(formData.endDate);
      
      return (
        (formStart >= requestStart && formStart <= requestEnd) ||
        (formEnd >= requestStart && formEnd <= requestEnd) ||
        (formStart <= requestStart && formEnd >= requestEnd)
      );
    });
    
    // Check leave balance
    const leaveType = formData.type.toLowerCase().includes('annual') ? 'annual' : 
                      formData.type.toLowerCase().includes('sick') ? 'sick' :
                      formData.type.toLowerCase().includes('emergency') ? 'emergency' :
                      formData.type.toLowerCase().includes('maternity') ? 'maternity' :
                      formData.type.toLowerCase().includes('paternity') ? 'paternity' : 'unpaid';
    
    const hasEnoughBalance = leaveBalance[leaveType].remaining >= days;
    
    // Generate substitute recommendations
    const substitutes = ['Sarah Johnson', 'Mike Williams', 'David Lee', 'Emma Thompson'];
    const recommendedSubstitute = substitutes[Math.floor(Math.random() * substitutes.length)];
    
    // Generate recommendation
    setAiRecommendation({
      days,
      isOverlapping,
      hasEnoughBalance,
      recommendedSubstitute,
      approvalLikelihood: isOverlapping ? 'Low' : hasEnoughBalance ? 'High' : 'Medium',
      message: isOverlapping 
        ? 'Your leave request overlaps with existing leave requests. Consider adjusting your dates.'
        : !hasEnoughBalance
        ? `You don't have enough ${leaveType} leave balance for this request. Consider using unpaid leave or adjusting the duration.`
        : 'Your leave request looks good and is likely to be approved.'
    });
  };
  
  // Submit leave request
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.startDate || !formData.endDate || !formData.reason) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Calculate days
    const days = calculateDays(formData.startDate, formData.endDate);
    
    // Simulate API call
    setTimeout(() => {
      const newRequest = {
        id: `LR-2023-${(leaveRequests.length + 1).toString().padStart(3, '0')}`,
        type: formData.type,
        startDate: formData.startDate,
        endDate: formData.endDate,
        days,
        reason: formData.reason,
        status: 'Pending',
        approver: 'John Smith',
        substitute: aiRecommendation?.recommendedSubstitute || 'To be assigned'
      };
      
      setLeaveRequests(prev => [newRequest, ...prev]);
      
      // Update leave balance
      const leaveType = formData.type.toLowerCase().includes('annual') ? 'annual' : 
                        formData.type.toLowerCase().includes('sick') ? 'sick' :
                        formData.type.toLowerCase().includes('emergency') ? 'emergency' :
                        formData.type.toLowerCase().includes('maternity') ? 'maternity' :
                        formData.type.toLowerCase().includes('paternity') ? 'paternity' : 'unpaid';
      
      setLeaveBalance(prev => ({
        ...prev,
        [leaveType]: {
          ...prev[leaveType],
          used: prev[leaveType].used + days,
          remaining: prev[leaveType].remaining - days
        }
      }));
      
      // Reset form
      setFormData({
        type: 'Annual Leave',
        startDate: '',
        endDate: '',
        reason: '',
        substituteRequired: true
      });
      
      setAiRecommendation(null);
      setShowRecommendation(false);
      setIsSubmitting(false);
      
      toast.success('Leave request submitted successfully!');
    }, 1500);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Leave Request Form */}
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">New Leave Request</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Leave Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  <option>Annual Leave</option>
                  <option>Sick Leave</option>
                  <option>Emergency Leave</option>
                  <option>Maternity Leave</option>
                  <option>Paternity Leave</option>
                  <option>Unpaid Leave</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="substituteRequired" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <input
                    type="checkbox"
                    id="substituteRequired"
                    name="substituteRequired"
                    checked={formData.substituteRequired}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2">Substitute Required</span>
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Check if you need someone to cover your duties during leave
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Reason
              </label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="Briefly describe the reason for your leave request"
              ></textarea>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                type="button"
                onClick={getRecommendation}
                disabled={!formData.startDate || !formData.endDate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <i className="fas fa-robot mr-2"></i>
                Get AI Recommendation
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    Submit Request
                  </>
                )}
              </button>
            </div>
          </form>
          
          {/* AI Recommendation */}
          {showRecommendation && aiRecommendation && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 flex items-center">
                <i className="fas fa-robot mr-2"></i>
                AI Recommendation
              </h3>
              
              <div className="mt-3 space-y-2 text-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Working Days:</span> {aiRecommendation.days} days
                </p>
                
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Approval Likelihood:</span>{' '}
                  <span className={`font-medium ${
                    aiRecommendation.approvalLikelihood === 'High' ? 'text-green-600 dark:text-green-400' :
                    aiRecommendation.approvalLikelihood === 'Medium' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-red-600 dark:text-red-400'
                  }`}>
                    {aiRecommendation.approvalLikelihood}
                  </span>
                </p>
                
                {formData.substituteRequired && (
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Recommended Substitute:</span> {aiRecommendation.recommendedSubstitute}
                  </p>
                )}
                
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  {aiRecommendation.message}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Leave Requests */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Recent Leave Requests</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Dates
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Days
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {leaveRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {request.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {request.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {request.startDate} to {request.endDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {request.days}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        request.status === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Leave Balance */}
      <div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Leave Balance</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Annual Leave</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {leaveBalance.annual.remaining}/{leaveBalance.annual.total} days
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(leaveBalance.annual.remaining / leaveBalance.annual.total) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sick Leave</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {leaveBalance.sick.remaining}/{leaveBalance.sick.total} days
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${(leaveBalance.sick.remaining / leaveBalance.sick.total) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Emergency Leave</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {leaveBalance.emergency.remaining}/{leaveBalance.emergency.total} days
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-yellow-600 h-2.5 rounded-full" 
                  style={{ width: `${(leaveBalance.emergency.remaining / leaveBalance.emergency.total) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Maternity Leave</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {leaveBalance.maternity.remaining}/{leaveBalance.maternity.total} days
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full" 
                  style={{ width: `${(leaveBalance.maternity.remaining / leaveBalance.maternity.total) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Paternity Leave</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {leaveBalance.paternity.remaining}/{leaveBalance.paternity.total} days
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full" 
                  style={{ width: `${(leaveBalance.paternity.remaining / leaveBalance.paternity.total) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Unpaid Leave</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {leaveBalance.unpaid.remaining}/{leaveBalance.unpaid.total} days
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-gray-600 h-2.5 rounded-full" 
                  style={{ width: `${(leaveBalance.unpaid.remaining / leaveBalance.unpaid.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Malaysian Leave Entitlements</h3>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Annual Leave: 8-16 days based on years of service</li>
              <li>• Sick Leave: 14-60 days based on years of service</li>
              <li>• Maternity Leave: 98 consecutive days (14 weeks)</li>
              <li>• Paternity Leave: 7 consecutive days</li>
              <li>• Public Holidays: 11 gazetted holidays</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AILeaveManagement;