import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import registerTaxImg from '../assets/images/register/regi-image.jpeg';

export default function Register() {
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = t('register.err.name');
    if (!form.email.trim()) errs.email = t('register.err.email');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = t('register.err.emailInvalid');
    if (!form.password) errs.password = t('register.err.password');
    else if (form.password.length < 8) errs.password = t('register.err.passwordShort');
    if (!form.confirmPassword) errs.confirmPassword = t('register.err.confirm');
    else if (form.password !== form.confirmPassword) errs.confirmPassword = t('register.err.mismatch');
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
      setServerError(err.message || t('register.err.failed'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container section">
      <div className="auth-layout">
        <div className="card" style={{ maxWidth: 440, width: '100%' }}>
          <h1>{t('register.title')}</h1>
          <p className="text-muted">{t('register.subtitle')}</p>

          {serverError && <div className="alert alert-error">{serverError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-name">{t('register.name')}</label>
              <input id="reg-name" name="name" type="text" className="form-input" value={form.name} onChange={handleChange} />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">{t('register.email')}</label>
              <input id="reg-email" name="email" type="email" className="form-input" value={form.email} onChange={handleChange} />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-password">{t('register.password')}</label>
              <input id="reg-password" name="password" type="password" className="form-input" value={form.password} onChange={handleChange} />
              {errors.password && <div className="form-error">{errors.password}</div>}
              <div className="form-hint">{t('register.hint')}</div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-confirm">{t('register.confirm')}</label>
              <input id="reg-confirm" name="confirmPassword" type="password" className="form-input" value={form.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
            </div>
            <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
              {submitting ? t('register.submitting') : t('register.submit')}
            </button>
          </form>

          <p className="text-center mt-4 mb-0">
            {t('register.hasAccount')} <Link to="/login">{t('register.login')}</Link>
          </p>
        </div>

        <div className="auth-illustration" aria-hidden="true">
          <img
            src={registerTaxImg}
            alt={t('register.illAlt')}
            style={{ width: '100%', height: 'auto', minHeight: 320, objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'block'; }}
          />
          <div className="image-placeholder" style={{ minHeight: 320, display: 'none' }}>
            <span>{t('register.illAlt')}</span>
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
