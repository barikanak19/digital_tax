import React from 'react';

export default function LoadingState({ label = 'Loading...' }) {
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
      <p className="mb-0">{label}</p>
      <style>{`@keyframes dts-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
