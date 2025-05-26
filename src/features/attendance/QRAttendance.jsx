import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const QRAttendance = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const [qrValue, setQrValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceHistory, setAttendanceHistory] = useState([
    { type: 'check-in', timestamp: new Date(new Date().setHours(9, 2, 15)), location: 'Main Office' },
    { type: 'check-out', timestamp: new Date(new Date().setHours(17, 30, 45)), location: 'Main Office' },
    { type: 'check-in', timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).setHours(8, 58, 30), location: 'Main Office' },
    { type: 'check-out', timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).setHours(17, 5, 12), location: 'Main Office' },
  ]);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Generate random QR code value
  useEffect(() => {
    const generateQRValue = () => {
      const timestamp = new Date().getTime();
      const random = Math.floor(Math.random() * 1000000);
      return `HRPBLOOM-${timestamp}-${random}`;
    };
    
    setQrValue(generateQRValue());
    
    // Regenerate QR code every 30 seconds
    const qrTimer = setInterval(() => {
      setQrValue(generateQRValue());
    }, 30000);
    
    return () => clearInterval(qrTimer);
  }, []);

  // Check if user is already checked in
  useEffect(() => {
    const todayCheckIns = attendanceHistory.filter(record => {
      const today = new Date();
      const recordDate = new Date(record.timestamp);
      return recordDate.getDate() === today.getDate() && 
             recordDate.getMonth() === today.getMonth() && 
             recordDate.getFullYear() === today.getFullYear();
    });
    
    if (todayCheckIns.length > 0) {
      const lastRecord = todayCheckIns[0];
      setIsCheckedIn(lastRecord.type === 'check-in');
      setLastAction(lastRecord);
    }
  }, [attendanceHistory]);

  // Format time as HH:MM:SS
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false
    });
  };

  // Format date as YYYY-MM-DD
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
  };

  // Handle check-in/check-out
  const handleAttendance = (type) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newRecord = {
        type,
        timestamp: new Date(),
        location: 'Main Office'
      };
      
      setAttendanceHistory(prev => [newRecord, ...prev]);
      setIsCheckedIn(type === 'check-in');
      setLastAction(newRecord);
      
      toast.success(`${type === 'check-in' ? 'Checked in' : 'Checked out'} successfully!`);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">QR Attendance System</h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* QR Code Section */}
          <div className="flex-1">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
              <div className="mb-4">
                <div className="inline-block bg-white p-3 rounded-lg">
                  {/* Placeholder for QR code - in a real app, use a QR code library */}
                  <div className="w-48 h-48 bg-gray-800 flex items-center justify-center">
                    <span className="text-white text-xs">QR Code: {qrValue.substring(0, 10)}...</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Scan this QR code with the office scanner to record your attendance
              </p>
              
              <div className="text-xs text-gray-500 dark:text-gray-500">
                Code refreshes every 30 seconds
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 dark:text-gray-400">Current Date:</span>
                <span className="font-medium text-gray-800 dark:text-white">{formatDate(currentTime)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Current Time:</span>
                <span className="font-medium text-gray-800 dark:text-white">{formatTime(currentTime)}</span>
              </div>
            </div>
            
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => handleAttendance('check-in')}
                disabled={isCheckedIn || isLoading}
                className={`flex-1 py-2 px-4 rounded-md ${
                  isCheckedIn 
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isLoading && !isCheckedIn ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    Check In
                  </>
                )}
              </button>
              
              <button
                onClick={() => handleAttendance('check-out')}
                disabled={!isCheckedIn || isLoading}
                className={`flex-1 py-2 px-4 rounded-md ${
                  !isCheckedIn 
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isLoading && isCheckedIn ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Check Out
                  </>
                )}
              </button>
            </div>
            
            {lastAction && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Last action: <span className="font-medium">{lastAction.type === 'check-in' ? 'Checked in' : 'Checked out'}</span> at {formatTime(new Date(lastAction.timestamp))}
                </p>
              </div>
            )}
          </div>
          
          {/* Attendance History */}
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Recent Attendance</h3>
            
            <div className="overflow-hidden bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Action
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                    {attendanceHistory.map((record, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                          {formatDate(new Date(record.timestamp))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                          {formatTime(new Date(record.timestamp))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            record.type === 'check-in'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {record.type === 'check-in' ? 'Check In' : 'Check Out'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                          {record.location}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRAttendance;