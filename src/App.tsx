import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationManager from './components/NavigationManager';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/navigation/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import AllProjects from './pages/AllProjects';
import AllArticles from './pages/AllArticles';
import BlogDetail from './components/BlogDetail';
import AdminLayout from './features/admin/components/layout/AdminLayout';
import AdminLogin from './features/admin/components/auth/AdminLogin';
import { ProtectedRoute } from './features/admin/components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <NavigationManager />
        <React.Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <Hero />
                <About />
                <Projects />
                <Blog />
                <Contact />
              </>
            } />
            <Route path="/projects" element={<><Navbar /><AllProjects /></>} />
            <Route path="/articles" element={<><Navbar /><AllArticles /></>} />
            <Route path="/blog/:slug" element={<><Navbar /><BlogDetail /></>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              {/* Nested admin routes go here */}
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<div>Admin Dashboard</div>} />
              {/* Add more admin routes as needed */}
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Catch-all route for 404 errors */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </React.Suspense>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </ErrorBoundary>
    </Router>
  );
}

export default App;