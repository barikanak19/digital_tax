import React from 'react';
import { Link } from 'react-router-dom';
import ServiceImage from './ServiceImage';
import { resolveImageSlug } from '../data/serviceImageMap';

export default function ServiceCard({ service }) {
  const imageSlug = resolveImageSlug(service.slug);
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--color-teal-100)' }}>
        <ServiceImage slug={imageSlug} role="card" alt={service.name} />
      </div>
      <h3 style={{ marginBottom: 4 }}>{service.name}</h3>
      <p style={{ flexGrow: 1 }}>{service.short_description}</p>
      <Link to={`/services/${service.id}`} className="btn btn-primary btn-block">
        View Guide
      </Link>
    </div>
  );
}
