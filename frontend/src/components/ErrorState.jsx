import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function ErrorState({ message, onRetry }) {
  const { t } = useLanguage();
  const msg = message ?? t('common.error.message');
  return (
    <div className="alert alert-error" role="alert">
      <strong>{t('common.error.title')}</strong>
      <p className="mb-0 mt-1">{msg}</p>
      {onRetry && (
        <button className="btn btn-outline btn-sm mt-2" onClick={onRetry} type="button">
          {t('common.tryAgain')}
        </button>
      )}
    </div>
  );
}
