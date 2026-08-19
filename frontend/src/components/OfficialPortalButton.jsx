import React from 'react';

export default function OfficialPortalButton({ portalName, portalUrl, label = 'Visit Official Portal →' }) {
  return (
    <div className="card text-center" style={{ background: 'var(--color-teal-100)', border: 'none' }}>
      <h3>Ready to Continue?</h3>
      <p>
        Complete your actual filing, registration, or payment directly on{' '}
        <strong>{portalName}</strong>. This platform provides guidance only.
      </p>
      <a href={portalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
        {label}
      </a>
    </div>
  );
}
