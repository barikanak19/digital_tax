import React from 'react';

export default function ServiceHeader({ service }) {
  return (
    <div className="card">
      <span className="badge badge-new">Tax Service Guide</span>
      <h1 className="mt-2">{service.name}</h1>
      <p style={{ fontSize: '1.05rem' }}>{service.short_description}</p>
    </div>
  );
}
