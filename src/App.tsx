import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
            <Route path="/projects" element={
              <>
                <Navbar />
                <AllProjects />
              </>
            } />
            <Route path="/articles" element={
              <>
                <Navbar />
                <AllArticles />
              </>
            } />
            <Route path="/blog/:slug" element={
              <>
                <Navbar />
                <BlogDetail />
              </>
            } />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            } />
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