import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import loginTaxImg from '../assets/images/login/log-image.jpeg';

export default function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = t('login.err.email');
    if (!form.password)     errs.password = t('login.err.password');
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
      setServerError(err.message || t('login.err.failed'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container section">
      <div className="auth-layout">
        <div className="card" style={{ maxWidth: 440, width: '100%' }}>
          <h1>{t('login.title')}</h1>
          <p className="text-muted">{t('login.subtitle')}</p>

          {serverError && <div className="alert alert-error">{serverError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">{t('login.email')}</label>
              <input id="login-email" name="email" type="email" className="form-input" value={form.email} onChange={handleChange} />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="login-password">{t('login.password')}</label>
              <input id="login-password" name="password" type="password" className="form-input" value={form.password} onChange={handleChange} />
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>
            <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
              {submitting ? t('login.submitting') : t('login.submit')}
            </button>
          </form>

          <p className="text-center mt-4 mb-0">
            {t('login.noAccount')} <Link to="/register">{t('login.register')}</Link>
          </p>
        </div>

        <div className="auth-illustration" aria-hidden="true">
          <img
            src={loginTaxImg}
            alt={t('login.illAlt')}
            style={{ width: '100%', height: 'auto', minHeight: 320, objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'block'; }}
          />
          <div className="image-placeholder" style={{ minHeight: 320, display: 'none' }}>
            <span>{t('login.illAlt')}</span>
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
