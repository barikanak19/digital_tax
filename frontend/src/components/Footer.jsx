import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-navy-900)', color: '#c7d3de', marginTop: 'var(--space-8)' }}>
      <div className="container" style={{ padding: 'var(--space-7) var(--space-4) var(--space-5)' }}>
        <div className="grid grid-3">
          <div>
            <h3 style={{ color: '#fff' }}>Digital Tax Support</h3>
            <p style={{ color: '#9fb0c0' }}>
              A guidance and awareness platform helping small business owners understand digital tax
              processes. This platform does not replace the official government portal — always
              complete actual filing and payment there.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#fff' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
              <li><Link to="/" style={{ color: '#c7d3de' }}>Home</Link></li>
              <li><Link to="/dashboard" style={{ color: '#c7d3de' }}>Dashboard</Link></li>
              <li><Link to="/services" style={{ color: '#c7d3de' }}>Tax Services</Link></li>
              <li><Link to="/tax-calendar" style={{ color: '#c7d3de' }}>Tax Calendar</Link></li>
              <li><Link to="/faqs" style={{ color: '#c7d3de' }}>FAQs</Link></li>
              <li><Link to="/safety" style={{ color: '#c7d3de' }}>Safety</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#fff' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
              <li><Link to="/feedback" style={{ color: '#c7d3de' }}>Feedback</Link></li>
              <li><Link to="/contact" style={{ color: '#c7d3de' }}>Contact for More Information</Link></li>
            </ul>
          </div>
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #24405a', margin: '32px 0 16px' }} />
        <p style={{ color: '#7f92a5', fontSize: '0.85rem', margin: 0 }}>
          © {new Date().getFullYear()} Digital Tax Filing Support for Small Businesses. Academic project — not an official government service.
        </p>
      </div>
    </footer>
  );
}
