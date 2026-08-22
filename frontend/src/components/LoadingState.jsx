import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LoadingState({ label }) {
  const { t } = useLanguage();
  const text = label ?? t('common.loading');
  return (
    <div className="text-center" style={{ padding: '48px 16px', color: 'var(--color-text-muted)' }}>
      <div
        aria-hidden="true"
        style={{
          width: 36, height: 36, margin: '0 auto 12px',
          border: '3px solid var(--color-border)',
          borderTopColor: 'var(--color-teal-500)',
          borderRadius: '50%',
          animation: 'dts-spin 0.8s linear infinite',
        }}
      />
      <p className="mb-0">{text}</p>
      <style>{`@keyframes dts-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
