import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const AnalyticsDashboard = () => {
  const [timeframe, setTimeframe] = useState('month');
  
  // Attendance data
  const attendanceData = {
    labels: timeframe === 'week' 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'On Time',
        data: timeframe === 'week' 
          ? [42, 45, 40, 43, 38, 12, 10]
          : [380, 390, 400, 410, 395, 405, 415, 420, 410, 400, 405, 410],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: 'Late',
        data: timeframe === 'week' 
          ? [3, 5, 8, 2, 7, 0, 0]
          : [20, 25, 15, 10, 25, 15, 5, 10, 20, 15, 10, 5],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };
  
  // Leave distribution data
  const leaveDistributionData = {
    labels: ['Annual', 'Sick', 'Emergency', 'Maternity', 'Paternity', 'Unpaid'],
    datasets: [
      {
        data: [45, 25, 10, 8, 5, 7],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Department headcount data
  const departmentData = {
    labels: ['HR', 'IT', 'Finance', 'Marketing', 'Operations', 'Sales', 'R&D'],
    datasets: [
      {
        label: 'Headcount',
        data: [12, 35, 18, 25, 42, 38, 20],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  // Turnover rate data
  const turnoverData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Turnover Rate (%)',
        data: [2.1, 1.8, 2.3, 1.5, 1.9, 2.2, 1.7, 1.6, 2.0, 1.8, 1.7, 1.9],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };
  
  // Chart options
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: false,
      },
    },
  };
  
  // Key metrics
  const keyMetrics = [
    { name: 'Total Employees', value: '1,482', change: '+3.2%', icon: 'fa-users', color: 'blue' },
    { name: 'Attendance Rate', value: '96.3%', change: '+0.5%', icon: 'fa-check-circle', color: 'green' },
    { name: 'Leave Utilization', value: '68.4%', change: '+2.1%', icon: 'fa-calendar-alt', color: 'yellow' },
    { name: 'Turnover Rate', value: '1.9%', change: '-0.3%', icon: 'fa-exchange-alt', color: 'red' },
  ];
  
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full bg-${metric.color}-100 dark:bg-${metric.color}-900 flex items-center justify-center mr-4`}>
                <i className={`fas ${metric.icon} text-${metric.color}-600 dark:text-${metric.color}-400 text-xl`}></i>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{metric.name}</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{metric.value}</p>
                  <span className={`ml-2 text-xs font-medium ${
                    metric.change.startsWith('+') 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Attendance Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Attendance Overview</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeframe('week')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeframe === 'week'
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeframe('month')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeframe === 'month'
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              Year
            </button>
          </div>
        </div>
        <Line data={attendanceData} options={lineOptions} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leave Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Leave Distribution</h2>
          <div className="h-64">
            <Doughnut data={leaveDistributionData} options={doughnutOptions} />
          </div>
        </div>
        
        {/* Department Headcount */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Department Headcount</h2>
          <Bar data={departmentData} options={barOptions} />
        </div>
      </div>
      
      {/* Turnover Rate */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Employee Turnover Rate</h2>
        <Line data={turnoverData} options={lineOptions} />
      </div>
      
      {/* AI Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
            <i className="fas fa-robot text-purple-600 dark:text-purple-400"></i>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">AI-Generated Insights</h2>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h3 className="text-sm font-medium text-purple-800 dark:text-purple-300 mb-2">Attendance Patterns</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              There's a consistent pattern of increased late arrivals on Wednesdays. Consider investigating potential causes such as midweek fatigue or external factors like traffic patterns.
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Leave Utilization</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Annual leave utilization is below target in the IT department. Encourage team members to plan their leave to prevent burnout and year-end leave congestion.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="text-sm font-medium text-green-800 dark:text-green-300 mb-2">Retention Improvement</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              The turnover rate has decreased by 0.3% compared to last year. This improvement correlates with the implementation of flexible working arrangements and enhanced benefits package.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;