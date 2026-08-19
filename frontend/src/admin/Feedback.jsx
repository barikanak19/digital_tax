import React, { useEffect, useState } from 'react';
import { fetchFeedbackAdmin } from '../services/adminService';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const [status, setStatus] = useState('loading');

  const load = () => {
    setStatus('loading');
    fetchFeedbackAdmin().then((res) => { setFeedback(res.data.feedback); setStatus('success'); }).catch(() => setStatus('error'));
  };
  useEffect(load, []);

  if (status === 'loading') return <LoadingState label="Loading feedback..." />;
  if (status === 'error') return <ErrorState onRetry={load} />;

  return (
    <div>
      <h1>Feedback</h1>
      <div className="grid grid-2 mt-4">
        {feedback.map((f) => (
          <div key={f.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{f.user_name}</strong>
              <span>{'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}</span>
            </div>
            <p className="mb-1 mt-2">{f.description}</p>
            <span className="text-muted" style={{ fontSize: '0.8rem' }}>
              {f.user_email} {f.service_name ? `• ${f.service_name}` : ''} • {new Date(f.created_at).toLocaleDateString()}
            </span>
          </div>
        ))}
        {!feedback.length && <p className="text-muted">No feedback submitted yet.</p>}
      </div>
    </div>
  );
}
