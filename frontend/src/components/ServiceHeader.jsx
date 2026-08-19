import React from 'react';
import ServiceImage from './ServiceImage';

export default function ServiceHeader({ service }) {
  return (
    <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-5)' }}>
      <div>
        <span className="badge badge-new">Tax Service Guide</span>
        <h1 className="mt-2">{service.name}</h1>
        <p style={{ fontSize: '1.05rem' }}>{service.short_description}</p>
      </div>
      <ServiceImage path={service.intro_image} alt={`${service.name} illustration`} />
    </div>
  );
}
