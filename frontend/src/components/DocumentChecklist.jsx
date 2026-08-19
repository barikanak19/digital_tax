import React from 'react';

export default function DocumentChecklist({ documents = [] }) {
  if (!documents.length) {
    return <p className="text-muted">No specific documents listed for this service.</p>;
  }
  return (
    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 'var(--space-2)' }}>
      {documents.map((doc) => (
        <li key={doc.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <span style={{ color: 'var(--color-teal-600)', fontWeight: 700 }} aria-hidden="true">✓</span>
          <span>{doc.document_name}</span>
        </li>
      ))}
    </ul>
  );
}
