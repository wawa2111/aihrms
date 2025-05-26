import React, { lazy, Suspense, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loader from "./components/shared/loaders/Loader.jsx";

// Layout components
const MainLayout = lazy(() => import("./layouts/MainLayout.jsx"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout.jsx"));

// Auth pages
const Login = lazy(() => import("./auth/Login.jsx"));
const Register = lazy(() => import("./auth/Register.jsx"));
const ForgotPassword = lazy(() => import("./auth/ForgotPassword.jsx"));

// Main pages
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Employees = lazy(() => import("./pages/Employees.jsx"));
const Attendance = lazy(() => import("./pages/Attendance.jsx"));
const Leave = lazy(() => import("./pages/Leave.jsx"));
const Analytics = lazy(() => import("./pages/Analytics.jsx"));

// Landing pages
const Home = lazy(() => import("./pages/landing/Home.jsx"));
const Features = lazy(() => import("./pages/landing/Features.jsx"));

// Feature components
const AIAssistant = lazy(() => import("./features/ai/AIAssistant.jsx"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
    
    // Check user's theme preference
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Toaster position="top-right" />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
        
        {/* Protected routes */}
        <Route 
          element={
            <MainLayout 
              darkMode={darkMode} 
              toggleDarkMode={toggleDarkMode} 
            />
          }
        >
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/employees" 
            element={isAuthenticated ? <Employees /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/attendance" 
            element={isAuthenticated ? <Attendance /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/leave" 
            element={isAuthenticated ? <Leave /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/analytics" 
            element={isAuthenticated ? <Analytics /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/ai-assistant" 
            element={isAuthenticated ? <AIAssistant /> : <Navigate to="/login" />} 
          />
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default App;