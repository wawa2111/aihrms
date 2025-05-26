import { useSelector } from 'react-redux';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Welcome back, {user?.name || 'User'}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="card bg-white dark:bg-secondary p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Employees
              </p>
              <p className="text-3xl font-semibold text-gray-900 dark:text-white">
                24
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900">
              <i className="fas fa-users text-blue-600 dark:text-blue-300"></i>
            </div>
          </div>
        </div>
        
        <div className="card bg-white dark:bg-secondary p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Present Today
              </p>
              <p className="text-3xl font-semibold text-gray-900 dark:text-white">
                18
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full dark:bg-green-900">
              <i className="fas fa-check-circle text-green-600 dark:text-green-300"></i>
            </div>
          </div>
        </div>
        
        <div className="card bg-white dark:bg-secondary p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                On Leave
              </p>
              <p className="text-3xl font-semibold text-gray-900 dark:text-white">
                3
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full dark:bg-yellow-900">
              <i className="fas fa-calendar-alt text-yellow-600 dark:text-yellow-300"></i>
            </div>
          </div>
        </div>
        
        <div className="card bg-white dark:bg-secondary p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending Requests
              </p>
              <p className="text-3xl font-semibold text-gray-900 dark:text-white">
                5
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-full dark:bg-red-900">
              <i className="fas fa-clock text-red-600 dark:text-red-300"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card bg-white dark:bg-secondary p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
              <i className="fas fa-user-plus text-blue-600 dark:text-blue-300"></i>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                New employee joined
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                John Doe joined as Software Developer
              </p>
            </div>
            <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">
              2 hours ago
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-100 rounded-full dark:bg-green-900">
              <i className="fas fa-check-circle text-green-600 dark:text-green-300"></i>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Leave request approved
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Jane Smith's leave request was approved
              </p>
            </div>
            <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">
              5 hours ago
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="p-2 bg-yellow-100 rounded-full dark:bg-yellow-900">
              <i className="fas fa-calendar-alt text-yellow-600 dark:text-yellow-300"></i>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                New leave request
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Mike Johnson requested annual leave
              </p>
            </div>
            <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">
              1 day ago
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;