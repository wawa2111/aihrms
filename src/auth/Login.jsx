import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/authentication.service.js.jsx";
import { toast } from "react-hot-toast";
import ButtonLoader from "../components/shared/loaders/ButtonLoader.js.jsx";
import AdminSetupModal from "../components/shared/AdminSetupModal.js.jsx";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authentication);

  const [showSetupModal, setShowSetupModal] = useState(false);
  const [systemStatus, setSystemStatus] = useState({ isChecking: true, isSetup: true });
  const [credentials, setCredentials] = useState({
    employeeId: "",
    password: "",
    authority: "employee",
    remember: false,
  });

  useEffect(() => {
    // Check if system is set up
    const checkSystemStatus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/system/status`);
        setSystemStatus({ 
          isChecking: false, 
          isSetup: response.data.data.isSetup 
        });
        
        if (!response.data.data.isSetup) {
          setShowSetupModal(true);
        }
      } catch (error) {
        console.error("Failed to check system status:", error);
        setSystemStatus({ isChecking: false, isSetup: true });
      }
    };
    
    checkSystemStatus();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(login(credentials)).unwrap();
      
      if (credentials.authority === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
      
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  const handleSystemSetup = async (setupData) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/system/setup`, setupData);
      setSystemStatus({ isChecking: false, isSetup: true });
      setShowSetupModal(false);
      toast.success("System setup completed successfully. You can now log in as admin.");
    } catch (error) {
      toast.error(error.response?.data?.message || "System setup failed");
      throw error;
    }
  };

  if (systemStatus.isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <img
                src="/hrms.png"
                alt="HRPBloom Logo"
                className="mx-auto h-16 mb-4"
              />
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Welcome Back
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Sign in to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="employeeId"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Employee ID
                </label>
                <input
                  id="employeeId"
                  name="employeeId"
                  type="text"
                  required
                  value={credentials.employeeId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter your employee ID"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <label
                  htmlFor="authority"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Login As
                </label>
                <select
                  id="authority"
                  name="authority"
                  value={credentials.authority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    checked={credentials.remember}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forget/password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  Forgot password?
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? <ButtonLoader /> : "Sign In"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/careers"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  Apply for a job
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="h-full flex flex-col justify-center items-center p-10 text-white">
            <h1 className="text-4xl font-bold mb-6">HRPBloom HRMS</h1>
            <p className="text-xl mb-8 text-center max-w-md">
              AI-powered Human Resource Management System for modern businesses
            </p>
            <div className="grid grid-cols-2 gap-6 max-w-md">
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <i className="fas fa-user-tie text-2xl mb-2"></i>
                <h3 className="font-semibold mb-1">Employee Management</h3>
                <p className="text-sm opacity-80">
                  Streamline employee data and records
                </p>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <i className="fas fa-clock text-2xl mb-2"></i>
                <h3 className="font-semibold mb-1">Attendance Tracking</h3>
                <p className="text-sm opacity-80">
                  QR-based attendance system
                </p>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <i className="fas fa-chart-line text-2xl mb-2"></i>
                <h3 className="font-semibold mb-1">Performance Analytics</h3>
                <p className="text-sm opacity-80">
                  Track and improve employee performance
                </p>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <i className="fas fa-robot text-2xl mb-2"></i>
                <h3 className="font-semibold mb-1">AI Integration</h3>
                <p className="text-sm opacity-80">
                  Smart insights and automation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSetupModal && (
        <AdminSetupModal 
          onClose={() => setShowSetupModal(false)} 
          onSetup={handleSystemSetup}
        />
      )}
    </>
  );
};

export default Login;