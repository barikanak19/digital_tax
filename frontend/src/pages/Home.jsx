import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import backImage from '../assets/images/backgrounds/back-image.jpeg';

export default function Home() {
  const { t } = useLanguage();

  const WHY_CARDS = [
    { titleKey: 'home.why.c1.title', descKey: 'home.why.c1.desc' },
    { titleKey: 'home.why.c2.title', descKey: 'home.why.c2.desc' },
    { titleKey: 'home.why.c3.title', descKey: 'home.why.c3.desc' },
    { titleKey: 'home.why.c4.title', descKey: 'home.why.c4.desc' },
    { titleKey: 'home.why.c5.title', descKey: 'home.why.c5.desc' },
    { titleKey: 'home.why.c6.title', descKey: 'home.why.c6.desc' },
  ];

  const HOW_STEPS = [
    'home.how.s1', 'home.how.s2', 'home.how.s3', 'home.how.s4', 'home.how.s5',
  ];

  return (
    <div>
      <section style={{
        background: `linear-gradient(160deg, rgba(15,36,56,0.88), rgba(30,66,96,0.82)), url(${backImage}) center/cover no-repeat`,
        color: '#fff',
      }}>
        <div className="container section text-center">
          <h1 style={{ color: '#fff' }}>{t('home.hero.title')}</h1>
          <p style={{ color: '#c7d3de', fontSize: '1.1rem', maxWidth: 640, margin: '0 auto 24px' }}>
            {t('home.hero.subtitle')}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services" className="btn btn-primary">{t('home.hero.explore')}</Link>
            <a href="#how-it-works" className="btn btn-outline" style={{ borderColor: '#3d5670', color: '#fff' }}>
              {t('home.hero.howItWorks')}
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-center">{t('home.why.title')}</h2>
          <div className="grid grid-3 mt-5">
            {WHY_CARDS.map((c) => (
              <div key={c.titleKey} className="card">
                <h3>{t(c.titleKey)}</h3>
                <p className="mb-0">{t(c.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="container">
          <h2 className="text-center">{t('home.how.title')}</h2>
          <div className="grid grid-4 mt-5">
            {HOW_STEPS.map((key, i) => (
              <div key={key} className="card text-center">
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', background: 'var(--color-teal-600)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, margin: '0 auto 12px',
                }}>
                  {i + 1}
                </div>
                <p className="mb-0" style={{ fontWeight: 600, color: 'var(--color-navy-900)' }}>{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section text-center">
        <div className="container">
          <h2>{t('home.cta.title')}</h2>
          <p>{t('home.cta.desc')}</p>
          <Link to="/services" className="btn btn-primary">{t('home.cta.btn')}</Link>
        </div>
      </section>
    </div>
  );
}
