import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/login-activity', label: 'Login Activity' },
  { to: '/admin/services', label: 'Services' },
  { to: '/admin/guides', label: 'Service Guides' },
  { to: '/admin/faqs', label: 'FAQs' },
  { to: '/admin/tax-calendar', label: 'Tax Calendar' },
  { to: '/admin/feedback', label: 'Feedback' },
  { to: '/admin/contact-requests', label: 'Contact Requests' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-shell">
      <button className="admin-sidebar-toggle" onClick={() => setOpen((o) => !o)} type="button">
        {open ? '✕ Close Menu' : '☰ Admin Menu'}
      </button>

      <aside className={`admin-sidebar ${open ? 'is-open' : ''}`}>
        <div className="admin-sidebar-header">
          <strong>Admin Panel</strong>
          <div className="text-muted" style={{ fontSize: '0.8rem' }}>{user?.name}</div>
        </div>
        <nav style={{ display: 'grid', gap: 4 }}>
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `admin-nav-link ${isActive ? 'is-active' : ''}`}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <button className="btn btn-outline btn-sm mt-4" onClick={logout} type="button">Logout</button>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>

      <style>{`
        .admin-shell { display: flex; min-height: calc(100vh - 64px); }
        .admin-sidebar {
          width: 240px; flex-shrink: 0; background: var(--color-navy-900); color: #fff;
          padding: var(--space-5) var(--space-4); display: flex; flex-direction: column;
        }
        .admin-sidebar-header { margin-bottom: var(--space-4); color: #fff; }
        .admin-nav-link { color: #c7d3de; padding: 8px 10px; border-radius: 6px; text-decoration: none; font-size: 0.92rem; }
        .admin-nav-link:hover { background: #1e3a52; text-decoration: none; }
        .admin-nav-link.is-active { background: var(--color-teal-600); color: #fff; font-weight: 600; }
        .admin-content { flex-grow: 1; padding: var(--space-5); background: var(--color-bg); }
        .admin-sidebar-toggle { display: none; }
        @media (max-width: 900px) {
          .admin-shell { flex-direction: column; }
          .admin-sidebar { display: none; width: 100%; }
          .admin-sidebar.is-open { display: flex; }
          .admin-sidebar-toggle {
            display: block; margin: var(--space-3) var(--space-4); padding: 10px 14px;
            background: var(--color-navy-900); color: #fff; border: none; border-radius: 6px; cursor: pointer;
          }
        }
      `}</style>
    </div>
  );
}
