import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loader from "./components/shared/loaders/Loader.jsx";

// Lazy-loaded components
const Login = lazy(() => import("./auth/Login.jsx"));
const Home = lazy(() => import("./pages/landing/Home.jsx"));
const Features = lazy(() => import("./pages/landing/Features.jsx"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default App;