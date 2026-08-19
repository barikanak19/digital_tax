import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './context/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import TaxCalendar from './pages/TaxCalendar';
import FAQs from './pages/FAQs';
import Safety from './pages/Safety';
import Feedback from './pages/Feedback';
import Contact from './pages/Contact';

import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminUsers from './admin/Users';
import AdminLoginActivity from './admin/LoginActivity';
import AdminServices from './admin/Services';
import AdminGuides from './admin/Guides';
import AdminFAQs from './admin/FAQs';
import AdminTaxCalendar from './admin/TaxCalendar';
import AdminFeedback from './admin/Feedback';
import AdminContactRequests from './admin/ContactRequests';

function PublicLayout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flexGrow: 1 }}>{children}</div>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="container section text-center">
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* ---------- Public / user-facing routes ---------- */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
      <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
      <Route path="/services/:serviceId" element={<PublicLayout><ServiceDetails /></PublicLayout>} />
      <Route path="/tax-calendar" element={<PublicLayout><TaxCalendar /></PublicLayout>} />
      <Route path="/faqs" element={<PublicLayout><FAQs /></PublicLayout>} />
      <Route path="/safety" element={<PublicLayout><Safety /></PublicLayout>} />
      <Route path="/feedback" element={<PublicLayout><Feedback /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

      <Route
        path="/dashboard"
        element={
          <PublicLayout>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </PublicLayout>
        }
      />

      {/* ---------- Admin routes ---------- */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="login-activity" element={<AdminLoginActivity />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="guides" element={<AdminGuides />} />
        <Route path="faqs" element={<AdminFAQs />} />
        <Route path="tax-calendar" element={<AdminTaxCalendar />} />
        <Route path="feedback" element={<AdminFeedback />} />
        <Route path="contact-requests" element={<AdminContactRequests />} />
      </Route>

      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
}
