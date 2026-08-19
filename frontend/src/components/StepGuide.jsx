import React from 'react';
import StepCard from './StepCard';

export default function StepGuide({ steps = [] }) {
  if (!steps.length) {
    return <p className="text-muted">Step-by-step guidance for this service is being prepared.</p>;
  }
  return (
    <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
      {steps.map((step) => (
        <StepCard key={step.id} step={step} />
      ))}
    </div>
  );
}
