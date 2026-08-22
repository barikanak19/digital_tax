import React, { useState } from 'react';
import { submitContactRequest } from '../services/contactService';
import { useLanguage } from '../context/LanguageContext';

const EMAIL_REGEX  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^(\+?\d{1,3}[- ]?)?\d{10}$/;

export default function ContactForm() {
  const { t } = useLanguage();
  const [mobile, setMobile]           = useState('');
  const [email, setEmail]             = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors]           = useState({});
  const [status, setStatus]           = useState('idle');
  const [serverMessage, setServerMessage] = useState('');

  const validate = () => {
    const errs = {};
    const hasEmail  = email.trim().length  > 0;
    const hasMobile = mobile.trim().length > 0;
    if (!hasEmail && !hasMobile)                          errs.contact     = t('contact.err.neither');
    if (hasEmail  && !EMAIL_REGEX.test(email.trim()))     errs.email       = t('contact.err.email');
    if (hasMobile && !MOBILE_REGEX.test(mobile.trim()))   errs.mobile      = t('contact.err.mobile');
    if (!description.trim())                              errs.description = t('contact.err.desc');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    try {
      await submitContactRequest({
        mobile_number: mobile.trim()      || undefined,
        email:         email.trim()       || undefined,
        description:   description.trim(),
      });
      setStatus('success');
      setServerMessage(t('contact.success'));
      setMobile(''); setEmail(''); setDescription('');
    } catch (err) {
      setStatus('error');
      setServerMessage(err.message || t('contact.err.generic'));
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <h3>{t('contact.form.title')}</h3>
      <p className="text-muted">{t('contact.form.note')}</p>

      {status === 'success' && <div className="alert alert-success">{serverMessage}</div>}
      {status === 'error'   && <div className="alert alert-error">{serverMessage}</div>}
      {errors.contact       && <div className="alert alert-error">{errors.contact}</div>}

      <div className="grid grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="contact-mobile">{t('contact.mobile')}</label>
          <input id="contact-mobile" type="tel" className="form-input" value={mobile}
            onChange={(e) => setMobile(e.target.value)} placeholder={t('contact.mobilePlaceholder')} />
          {errors.mobile && <div className="form-error">{errors.mobile}</div>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-email">{t('contact.email')}</label>
          <input id="contact-email" type="email" className="form-input" value={email}
            onChange={(e) => setEmail(e.target.value)} placeholder={t('contact.emailPlaceholder')} />
          {errors.email && <div className="form-error">{errors.email}</div>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="contact-desc">{t('contact.desc')}</label>
        <textarea id="contact-desc" className="form-textarea" value={description}
          onChange={(e) => setDescription(e.target.value)} placeholder={t('contact.descPlaceholder')} />
        {errors.description && <div className="form-error">{errors.description}</div>}
      </div>

      <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? t('contact.submitting') : t('contact.submit')}
      </button>
    </form>
  );
}
