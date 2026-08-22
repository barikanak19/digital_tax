import React from 'react';
import FeedbackForm from '../components/FeedbackForm';
import { useLanguage } from '../context/LanguageContext';

export default function Feedback() {
  const { t } = useLanguage();
  return (
    <div className="container section">
      <h1>{t('feedback.title')}</h1>
      <p className="text-muted">{t('feedback.subtitle')}</p>
      <div style={{ maxWidth: 560 }} className="mt-4">
        <FeedbackForm />
      </div>
    </div>
  );
}
