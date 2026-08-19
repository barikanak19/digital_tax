import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Tax Services' },
  { to: '/tax-calendar', label: 'Tax Calendar' },
  { to: '/faqs', label: 'FAQs' },
  { to: '/safety', label: 'Safety' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  return (
    <header style={{ background: 'var(--color-navy-900)', position: 'sticky', top: 0, zIndex: 40, boxShadow: 'var(--shadow-sm)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link to="/" style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none' }} onClick={() => setOpen(false)}>
          Digital Tax Support
        </Link>

        <button
          className="navbar-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          style={{
            display: 'none', background: 'transparent', border: 'none', color: '#fff',
            fontSize: '1.5rem', cursor: 'pointer',
          }}
        >
          {open ? '✕' : '☰'}
        </button>

        <nav
          className={`navbar-links ${open ? 'is-open' : ''}`}
          aria-label="Primary navigation"
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
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
              <NavLink to="/dashboard" onClick={() => setOpen(false)} style={({ isActive }) => ({ color: isActive ? 'var(--color-teal-500)' : '#dbe4ec', fontWeight: 500, fontSize: '0.92rem', textDecoration: 'none' })}>
                Dashboard
              </NavLink>
              <span style={{ color: '#8ea0b3', fontSize: '0.85rem' }}>Hi, {user.name.split(' ')[0]}</span>
              <button className="btn btn-outline btn-sm" style={{ borderColor: '#3d5670', color: '#fff' }} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="btn btn-outline btn-sm" style={{ borderColor: '#3d5670', color: '#fff' }}>
                Login
              </Link>
              <Link to="/register" onClick={() => setOpen(false)} className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>

      <style>{`
        .navbar-links { display: flex; align-items: center; gap: 22px; }
        @media (max-width: 900px) {
          .navbar-toggle { display: block !important; }
          .navbar-links {
            display: none; position: absolute; top: 64px; left: 0; right: 0;
            background: var(--color-navy-900); flex-direction: column; align-items: flex-start;
            padding: var(--space-4); gap: var(--space-4); border-top: 1px solid #24405a;
          }
          .navbar-links.is-open { display: flex; }
        }
      `}</style>
    </header>
  );
}
