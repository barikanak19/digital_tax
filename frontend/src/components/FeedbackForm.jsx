import React, { useState } from 'react';
import { submitFeedback } from '../services/feedbackService';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function FeedbackForm({ serviceId = null }) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverMessage, setServerMessage] = useState('');

  const validate = () => {
    const errs = {};
    if (!rating)              errs.rating      = t('feedback.err.rating');
    if (!description.trim())  errs.description = t('feedback.err.desc');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setStatus('error');
      setServerMessage(t('feedback.loginRequired'));
      return;
    }
    if (!validate()) return;
    setStatus('submitting');
    try {
      await submitFeedback({ rating, description: description.trim(), service_id: serviceId });
      setStatus('success');
      setServerMessage(t('feedback.success'));
      setRating(0);
      setDescription('');
    } catch (err) {
      setStatus('error');
      setServerMessage(err.message || t('feedback.err.generic'));
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <h3>{t('feedback.form.title')}</h3>

      {status === 'success' && <div className="alert alert-success">{serverMessage}</div>}
      {status === 'error'   && <div className="alert alert-error">{serverMessage}</div>}

      <div className="form-group">
        <span className="form-label">{t('feedback.rating')}</span>
        <div role="radiogroup" aria-label={t('feedback.ratingAria')} style={{ display: 'flex', gap: 8 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              onClick={() => setRating(n)}
              style={{
                width: 40, height: 40, borderRadius: '50%', cursor: 'pointer',
                border: `2px solid ${rating >= n ? 'var(--color-amber-500)' : 'var(--color-border)'}`,
                background: rating >= n ? 'var(--color-amber-100)' : 'var(--color-surface)',
                fontSize: '1.1rem',
              }}
            >
              ★
            </button>
          ))}
        </div>
        {errors.rating && <div className="form-error">{errors.rating}</div>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="feedback-desc">{t('feedback.desc')}</label>
        <textarea
          id="feedback-desc"
          className="form-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t('feedback.placeholder')}
        />
        {errors.description && <div className="form-error">{errors.description}</div>}
      </div>

      <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? t('feedback.submitting') : t('feedback.submit')}
      </button>
    </form>
  );
}
