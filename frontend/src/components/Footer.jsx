import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ background: 'var(--color-navy-900)', color: '#c7d3de', marginTop: 'var(--space-8)' }}>
      <div className="container" style={{ padding: 'var(--space-7) var(--space-4) var(--space-5)' }}>
        <div className="grid grid-3">
          <div>
            <h3 style={{ color: '#fff' }}>{t('footer.brand')}</h3>
            <p style={{ color: '#9fb0c0' }}>{t('footer.about')}</p>
          </div>
          <div>
            <h4 style={{ color: '#fff' }}>{t('footer.quickLinks')}</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
              <li><Link to="/"             style={{ color: '#c7d3de' }}>{t('footer.home')}</Link></li>
              <li><Link to="/dashboard"    style={{ color: '#c7d3de' }}>{t('footer.dashboard')}</Link></li>
              <li><Link to="/services"     style={{ color: '#c7d3de' }}>{t('footer.services')}</Link></li>
              <li><Link to="/tax-calendar" style={{ color: '#c7d3de' }}>{t('footer.calendar')}</Link></li>
              <li><Link to="/faqs"         style={{ color: '#c7d3de' }}>{t('footer.faqs')}</Link></li>
              <li><Link to="/safety"       style={{ color: '#c7d3de' }}>{t('footer.safety')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#fff' }}>{t('footer.support')}</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
              <li><Link to="/feedback" style={{ color: '#c7d3de' }}>{t('footer.feedback')}</Link></li>
              <li><Link to="/contact"  style={{ color: '#c7d3de' }}>{t('footer.contact')}</Link></li>
            </ul>
          </div>
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #24405a', margin: '32px 0 16px' }} />
        <p style={{ color: '#7f92a5', fontSize: '0.85rem', margin: 0 }}>
          © {new Date().getFullYear()} {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
