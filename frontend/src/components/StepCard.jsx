import React from 'react';
import ServiceImage from './ServiceImage';

export default function StepCard({ step }) {
  return (
    <div className="card" style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
      <div
        aria-hidden="true"
        style={{
          flexShrink: 0, width: 36, height: 36, borderRadius: '50%',
          background: 'var(--color-navy-800)', color: '#fff', display: 'flex',
          alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.95rem',
        }}
      >
        {step.step_number}
      </div>
      <div style={{ flexGrow: 1 }}>
        <h3 style={{ marginBottom: 6 }}>{step.step_title}</h3>
        <p className="mb-0">{step.step_description}</p>
        {step.step_image && (
          <div className="mt-3">
            <ServiceImage path={step.step_image} alt={step.step_title} />
          </div>
        )}
      </div>
    </div>
  );
}
