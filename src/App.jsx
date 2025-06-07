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
import AccessibleDemo from './pages/AccessibleDemo';
import AccessibleDemoRequest from './pages/AccessibleDemoRequest';
import HRAccessibleDemo from './pages/HRAccessibleDemo';
import AccessibleHRDashboard from './pages/AccessibleHRDashboard';
import Contact from './pages/Contact';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import ForgotPassword from './pages/ForgotPassword';

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
        <Route path="/accessible-demo" element={<AccessibleDemo />} />
        <Route path="/accessible-demo-request" element={<AccessibleDemoRequest />} />
        <Route path="/hr-accessible-demo" element={<HRAccessibleDemo />} />
        <Route path="/hr-accessible-dashboard" element={<AccessibleHRDashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<Contact />} />
        <Route path="/contact-sales" element={<Contact />} />
        <Route path="/features/case-studies" element={<Features />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/security" element={<Terms />} />
        <Route path="/compliance" element={<Terms />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        
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