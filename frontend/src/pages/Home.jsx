import React from 'react';
import { Link } from 'react-router-dom';

const WHY_CARDS = [
  { title: 'Simple Tax Guidance', desc: 'Clear, plain-language explanations of digital tax processes.' },
  { title: 'Document Checklists', desc: 'Know exactly what documents and information you need, per service.' },
  { title: 'Step-by-Step Instructions', desc: 'Follow a structured process from start to finish for each service.' },
  { title: 'Visual Guides', desc: 'Illustrated guidance to make each process easier to follow.' },
  { title: 'Safety Awareness', desc: 'Learn how to protect yourself from tax-related fraud and scams.' },
  { title: 'Official Portal Access', desc: 'Direct links to the correct official government portal for each service.' },
];

const HOW_IT_WORKS = [
  'Select a Service',
  'Understand Requirements',
  'Prepare Documents',
  'Follow Step-by-Step Guide',
  'Visit Official Portal',
];

export default function Home() {
  return (
    <div>
      <section style={{ background: 'linear-gradient(160deg, var(--color-navy-900), var(--color-navy-700))', color: '#fff' }}>
        <div className="container section text-center">
          <h1 style={{ color: '#fff' }}>Digital Tax Filing Support for Small Businesses</h1>
          <p style={{ color: '#c7d3de', fontSize: '1.1rem', maxWidth: 640, margin: '0 auto 24px' }}>
            Understand, Prepare and Navigate Digital Tax Processes with Confidence.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services" className="btn btn-primary">Explore Tax Services</Link>
            <a href="#how-it-works" className="btn btn-outline" style={{ borderColor: '#3d5670', color: '#fff' }}>How It Works</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-center">Why Use Our Platform?</h2>
          <div className="grid grid-3 mt-5">
            {WHY_CARDS.map((c) => (
              <div key={c.title} className="card">
                <h3>{c.title}</h3>
                <p className="mb-0">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="container">
          <h2 className="text-center">How It Works</h2>
          <div className="grid grid-4 mt-5">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step} className="card text-center">
                <div
                  style={{
                    width: 40, height: 40, borderRadius: '50%', background: 'var(--color-teal-600)',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, margin: '0 auto 12px',
                  }}
                >
                  {i + 1}
                </div>
                <p className="mb-0" style={{ fontWeight: 600, color: 'var(--color-navy-900)' }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section text-center">
        <div className="container">
          <h2>Ready to get started?</h2>
          <p>Browse all 20 tax services and find the guidance you need.</p>
          <Link to="/services" className="btn btn-primary">Explore Tax Services</Link>
        </div>
      </section>
    </div>
  );
}
