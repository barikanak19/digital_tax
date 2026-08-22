import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  const links = [
    { to: '/',            label: t('nav.home'),      end: true },
    { to: '/services',    label: t('nav.services') },
    { to: '/tax-calendar',label: t('nav.calendar') },
    { to: '/faqs',        label: t('nav.faqs') },
    { to: '/safety',      label: t('nav.safety') },
  ];

  return (
    <header style={{ background: 'var(--color-navy-900)', position: 'sticky', top: 0, zIndex: 40, boxShadow: 'var(--shadow-sm)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link to="/" style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none' }} onClick={() => setOpen(false)}>
          {t('nav.brand')}
        </Link>

        <button
          className="navbar-toggle"
          aria-label={t('nav.toggleMenu')}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          style={{ display: 'none', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
        >
          {open ? '✕' : '☰'}
        </button>

        <nav className={`navbar-links ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                color: isActive ? 'var(--color-teal-500)' : '#dbe4ec',
                fontWeight: 500, fontSize: '0.92rem', textDecoration: 'none',
              })}
            >
              {l.label}
            </NavLink>
          ))}

          {user ? (
            <>
              <NavLink
                to="/dashboard"
                onClick={() => setOpen(false)}
                style={({ isActive }) => ({ color: isActive ? 'var(--color-teal-500)' : '#dbe4ec', fontWeight: 500, fontSize: '0.92rem', textDecoration: 'none' })}
              >
                {t('nav.dashboard')}
              </NavLink>
              <span style={{ color: '#8ea0b3', fontSize: '0.85rem' }}>{t('nav.hi')}, {user.name.split(' ')[0]}</span>
              <button className="btn btn-outline btn-sm" style={{ borderColor: '#3d5670', color: '#fff' }} onClick={handleLogout}>
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="btn btn-outline btn-sm" style={{ borderColor: '#3d5670', color: '#fff' }}>
                {t('nav.login')}
              </Link>
              <Link to="/register" onClick={() => setOpen(false)} className="btn btn-primary btn-sm">
                {t('nav.register')}
              </Link>
            </>
          )}

          {/* ── Theme toggle ── */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? t('theme.dark') : t('theme.light')}
            title={theme === 'light' ? t('theme.dark') : t('theme.light')}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* ── Language selector ── */}
          <select
            className="lang-select"
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            aria-label="Select language"
          >
            <option value="en">{t('lang.en')}</option>
            <option value="hi">{t('lang.hi')}</option>
            <option value="mr">{t('lang.mr')}</option>
          </select>
        </nav>
      </div>

      <style>{`
        .navbar-links { display: flex; align-items: center; gap: 18px; flex-wrap: nowrap; }
        @media (max-width: 900px) {
          .navbar-toggle { display: block !important; }
          .navbar-links {
            display: none; position: absolute; top: 64px; left: 0; right: 0;
            background: var(--color-navy-900); flex-direction: column; align-items: flex-start;
            padding: var(--space-4); gap: var(--space-4); border-top: 1px solid #24405a;
            flex-wrap: wrap;
          }
          .navbar-links.is-open { display: flex; }
        }
      `}</style>
    </header>
  );
}
