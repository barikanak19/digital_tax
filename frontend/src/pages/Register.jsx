import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import registerTaxImg from '../assets/images/auth/register_tax.png';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Please enter a valid email address.';
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters long.';
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password.';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    setSubmitting(true);
    try {
      await register(form);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container section">
      <div className="auth-layout">
        <div className="card" style={{ maxWidth: 440, width: '100%' }}>
          <h1>Create Your Account</h1>
          <p className="text-muted">Register to access tax service guides and save your progress.</p>

          {serverError && <div className="alert alert-error">{serverError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-name">Name</label>
              <input id="reg-name" name="name" type="text" className="form-input" value={form.name} onChange={handleChange} />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">Email</label>
              <input id="reg-email" name="email" type="email" className="form-input" value={form.email} onChange={handleChange} />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-password">Password</label>
              <input id="reg-password" name="password" type="password" className="form-input" value={form.password} onChange={handleChange} />
              {errors.password && <div className="form-error">{errors.password}</div>}
              <div className="form-hint">Minimum 8 characters.</div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-confirm">Confirm Password</label>
              <input id="reg-confirm" name="confirmPassword" type="password" className="form-input" value={form.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
            </div>
            <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
              {submitting ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <p className="text-center mt-4 mb-0">
            Already have an account? <Link to="/login">Log in here</Link>
          </p>
        </div>

        <div className="auth-illustration" aria-hidden="true">
          <img
            src={registerTaxImg}
            alt="Register illustration"
            style={{ width: '100%', height: 'auto', minHeight: 320, objectFit: 'contain' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'block';
            }}
          />
          <div className="image-placeholder" style={{ minHeight: 320, display: 'none' }}>
            <span>Register illustration</span>
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
