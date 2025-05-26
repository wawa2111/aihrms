import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Title
);

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  
  // Sample data for charts
  const attendanceData = {
    labels: ['Present', 'Absent', 'Late', 'Leave'],
    datasets: [
      {
        data: [85, 5, 7, 3],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const leaveData = {
    labels: ['Sick', 'Vacation', 'Personal', 'Maternity/Paternity', 'Other'],
    datasets: [
      {
        data: [12, 19, 8, 5, 2],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(156, 163, 175, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  const productivityData = {
    labels: months.slice(currentMonth - 5, currentMonth + 1),
    datasets: [
      {
        label: 'Productivity Score',
        data: [78, 82, 80, 85, 90, 88],
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const departmentPerformance = {
    labels: ['HR', 'Engineering', 'Marketing', 'Sales', 'Finance', 'Operations'],
    datasets: [
      {
        label: 'Performance Score',
        data: [85, 92, 78, 89, 82, 87],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics Dashboard</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === 'week' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Week
          </button>
          <button 
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === 'month' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Month
          </button>
          <button 
            onClick={() => setTimeRange('quarter')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === 'quarter' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Quarter
          </button>
          <button 
            onClick={() => setTimeRange('year')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === 'year' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Year
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attendance Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Attendance Distribution</h3>
          <div className="h-64">
            <Pie data={attendanceData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Leave Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Leave Distribution</h3>
          <div className="h-64">
            <Pie data={leaveData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Productivity Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Productivity Trends</h3>
          <div className="h-64">
            <Line 
              data={productivityData} 
              options={{ 
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    min: 70,
                    max: 100
                  }
                }
              }} 
            />
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Department Performance</h3>
          <div className="h-64">
            <Bar 
              data={departmentPerformance} 
              options={{ 
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    min: 70,
                    max: 100
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Attendance</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">92%</p>
          <div className="flex items-center mt-2">
            <span className="text-green-500 text-sm flex items-center">
              <i className="fas fa-arrow-up mr-1"></i> 3%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last {timeRange}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Leave Utilization</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">45%</p>
          <div className="flex items-center mt-2">
            <span className="text-red-500 text-sm flex items-center">
              <i className="fas fa-arrow-down mr-1"></i> 5%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last {timeRange}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Productivity</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">88%</p>
          <div className="flex items-center mt-2">
            <span className="text-green-500 text-sm flex items-center">
              <i className="fas fa-arrow-up mr-1"></i> 2%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last {timeRange}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Employee Satisfaction</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">4.2/5</p>
          <div className="flex items-center mt-2">
            <span className="text-green-500 text-sm flex items-center">
              <i className="fas fa-arrow-up mr-1"></i> 0.3
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last {timeRange}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;