import React, { useState } from 'react';

export default function FAQAccordion({ faqs = [] }) {
  const [openId, setOpenId] = useState(null);

  if (!faqs.length) {
    return <p className="text-muted">No FAQs available yet for this section.</p>;
  }

  return (
    <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className="card" style={{ padding: 'var(--space-4)' }}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
              style={{
                width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer',
                fontWeight: 600, fontSize: '1rem', color: 'var(--color-navy-900)', padding: 0,
              }}
            >
              <span>{faq.question}</span>
              <span aria-hidden="true" style={{ color: 'var(--color-teal-600)', fontSize: '1.2rem' }}>
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && <p className="mt-3 mb-0">{faq.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
