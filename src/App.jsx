import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Landing from './pages/Landing';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Demo from './pages/Demo';
import Contact from './pages/Contact';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/features/:featureId" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<Contact />} />
        <Route path="/contact-sales" element={<Contact />} />
        <Route path="/case-studies" element={<Features />} />
        <Route path="/terms" element={<NotFound />} />
        <Route path="/privacy" element={<NotFound />} />
        <Route path="/security" element={<NotFound />} />
        <Route path="/compliance" element={<NotFound />} />
        <Route path="/forgot-password" element={<NotFound />} />
        
        {/* Auth Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
          <Route path="signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
        </Route>
        
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<NotFound />} />
          <Route path="attendance" element={<NotFound />} />
          <Route path="leave" element={<NotFound />} />
          <Route path="analytics" element={<NotFound />} />
          <Route path="settings" element={<NotFound />} />
          <Route path="hr-assistant" element={<NotFound />} />
          <Route path="departments" element={<NotFound />} />
          <Route path="roles" element={<NotFound />} />
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;