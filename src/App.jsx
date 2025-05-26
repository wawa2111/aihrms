import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
        </Route>
        
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* Add more routes here */}
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;