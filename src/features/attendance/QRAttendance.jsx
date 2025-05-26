import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const QRAttendance = () => {
  const [scanning, setScanning] = useState(false);
  const [location, setLocation] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const { user } = useSelector(state => state.authentication);

  // Simulate QR code scanning
  const startScanning = () => {
    setScanning(true);
    
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          
          // Simulate successful scan after 2 seconds
          setTimeout(() => {
            const currentTime = new Date();
            const hours = currentTime.getHours();
            
            // Determine if check-in or check-out based on time
            const isCheckIn = hours < 12;
            
            setAttendanceStatus({
              type: isCheckIn ? 'check-in' : 'check-out',
              time: currentTime.toLocaleTimeString(),
              date: currentTime.toLocaleDateString()
            });
            
            toast.success(`${isCheckIn ? 'Check-in' : 'Check-out'} successful!`);
            setScanning(false);
          }, 2000);
        },
        (error) => {
          toast.error('Unable to access location. Please enable location services.');
          setScanning(false);
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser.');
      setScanning(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">QR Attendance</h2>
      
      <div className="flex flex-col items-center">
        {scanning ? (
          <div className="relative w-64 h-64 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
            {/* Simulated QR scanner */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-1 bg-primary-500 animate-[scan_2s_linear_infinite]"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-2 border-primary-500 rounded-lg"></div>
            </div>
          </div>
        ) : (
          <div className="w-64 h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
            <i className="fas fa-qrcode text-6xl text-gray-400"></i>
          </div>
        )}
        
        {attendanceStatus && (
          <div className="mb-6 text-center">
            <div className="text-lg font-semibold text-gray-800 dark:text-white">
              {attendanceStatus.type === 'check-in' ? 'Checked In' : 'Checked Out'}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {attendanceStatus.time} on {attendanceStatus.date}
            </div>
            {location && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Location: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </div>
            )}
          </div>
        )}
        
        <button
          onClick={startScanning}
          disabled={scanning}
          className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {scanning ? 'Scanning...' : 'Scan QR Code'}
        </button>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Recent Activity</h3>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {/* Sample data */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date().toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">09:05 AM</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">05:30 PM</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                    Present
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(Date.now() - 86400000).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">09:15 AM</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">06:00 PM</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                    Present
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QRAttendance;