import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import loginTaxImg from '../assets/images/auth/login_tax.png';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required.';
    if (!form.password) errs.password = 'Password is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    setSubmitting(true);
    try {
      await login(form);
      const redirectTo = location.state?.from || '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container section">
      <div className="auth-layout">
        <div className="card" style={{ maxWidth: 440, width: '100%' }}>
          <h1>Log In</h1>
          <p className="text-muted">Access your dashboard and saved services.</p>

          {serverError && <div className="alert alert-error">{serverError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Email</label>
              <input id="login-email" name="email" type="email" className="form-input" value={form.email} onChange={handleChange} />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="login-password">Password</label>
              <input id="login-password" name="password" type="password" className="form-input" value={form.password} onChange={handleChange} />
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>
            <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
              {submitting ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <p className="text-center mt-4 mb-0">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>

        <div className="auth-illustration" aria-hidden="true">
          <img
            src={loginTaxImg}
            alt="Login illustration"
            style={{ width: '100%', height: 'auto', minHeight: 320, objectFit: 'contain' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'block';
            }}
          />
          <div className="image-placeholder" style={{ minHeight: 320, display: 'none' }}>
            <span>Login illustration</span>
          </div>
        </div>
      </div>

      <style>{`
        .auth-layout { display: flex; gap: var(--space-6); align-items: center; justify-content: center; flex-wrap: wrap; }
        .auth-illustration { flex: 1; min-width: 280px; max-width: 420px; }
        .auth-illustration img { max-width: 100%; height: auto; object-fit: contain; }
        @media (max-width: 800px) { .auth-layout { flex-direction: column-reverse; } }
      `}</style>
    </div>
  );
}
