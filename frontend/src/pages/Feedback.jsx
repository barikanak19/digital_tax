import React from 'react';
import FeedbackForm from '../components/FeedbackForm';

export default function Feedback() {
  return (
    <div className="container section">
      <h1>Feedback</h1>
      <p className="text-muted">Your feedback helps us improve this platform for small business owners.</p>
      <div style={{ maxWidth: 560 }} className="mt-4">
        <FeedbackForm />
      </div>
    </div>
  );
}
