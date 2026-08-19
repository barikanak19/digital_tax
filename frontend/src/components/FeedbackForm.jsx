import React, { useState } from 'react';
import { submitFeedback } from '../services/feedbackService';
import { useAuth } from '../context/AuthContext';

export default function FeedbackForm({ serviceId = null }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState('');

  const validate = () => {
    const errs = {};
    if (!rating) errs.rating = 'Please select a rating from 1 to 5.';
    if (!description.trim()) errs.description = 'Please share a few words of feedback.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setStatus('error');
      setServerMessage('Please log in to submit feedback.');
      return;
    }
    if (!validate()) return;

    setStatus('submitting');
    try {
      await submitFeedback({ rating, description: description.trim(), service_id: serviceId });
      setStatus('success');
      setServerMessage('Thank you for your feedback!');
      setRating(0);
      setDescription('');
    } catch (err) {
      setStatus('error');
      setServerMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <h3>Share Your Feedback</h3>

      {status === 'success' && <div className="alert alert-success">{serverMessage}</div>}
      {status === 'error' && <div className="alert alert-error">{serverMessage}</div>}

      <div className="form-group">
        <span className="form-label">Rating</span>
        <div role="radiogroup" aria-label="Rating from 1 to 5" style={{ display: 'flex', gap: 8 }}>
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
                background: rating >= n ? 'var(--color-amber-100)' : '#fff',
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
        <label className="form-label" htmlFor="feedback-desc">Description</label>
        <textarea
          id="feedback-desc"
          className="form-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell us what worked well or what we can improve..."
        />
        {errors.description && <div className="form-error">{errors.description}</div>}
      </div>

      <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
}
