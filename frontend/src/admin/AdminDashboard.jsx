import React, { useEffect, useState } from 'react';
import { fetchDashboardStats } from '../services/adminService';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');

  const load = () => {
    setStatus('loading');
    fetchDashboardStats()
      .then((res) => { setData(res.data); setStatus('success'); })
      .catch(() => setStatus('error'));
  };
  useEffect(load, []);

  if (status === 'loading') return <LoadingState label="Loading dashboard..." />;
  if (status === 'error' || !data) return <ErrorState onRetry={load} />;

  const { totals, recentLoginActivity, recentFeedback, recentContactRequests } = data;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="grid grid-4 mt-4">
        <div className="card"><div className="text-muted">Total Users</div><h2 className="mt-1">{totals.totalUsers}</h2></div>
        <div className="card"><div className="text-muted">Total Services</div><h2 className="mt-1">{totals.totalServices}</h2></div>
        <div className="card"><div className="text-muted">Total Feedback</div><h2 className="mt-1">{totals.totalFeedback}</h2></div>
        <div className="card"><div className="text-muted">Contact Requests</div><h2 className="mt-1">{totals.totalContactRequests}</h2></div>
      </div>

      <div className="grid grid-3 mt-6">
        <div className="card">
          <h3>Recent Login Activity</h3>
          {recentLoginActivity.length ? recentLoginActivity.map((l) => (
            <div key={l.id} className="mt-2" style={{ fontSize: '0.88rem', borderBottom: '1px solid var(--color-border)', paddingBottom: 8 }}>
              <strong>{l.user_name}</strong> — {new Date(l.login_at).toLocaleString()}
            </div>
          )) : <p className="text-muted mb-0">No login activity yet.</p>}
        </div>
        <div className="card">
          <h3>Recent Feedback</h3>
          {recentFeedback.length ? recentFeedback.map((f) => (
            <div key={f.id} className="mt-2" style={{ fontSize: '0.88rem', borderBottom: '1px solid var(--color-border)', paddingBottom: 8 }}>
              <strong>{f.user_name}</strong> — {'★'.repeat(f.rating)} — {f.description.slice(0, 60)}
            </div>
          )) : <p className="text-muted mb-0">No feedback yet.</p>}
        </div>
        <div className="card">
          <h3>Recent Contact Requests</h3>
          {recentContactRequests.length ? recentContactRequests.map((c) => (
            <div key={c.id} className="mt-2" style={{ fontSize: '0.88rem', borderBottom: '1px solid var(--color-border)', paddingBottom: 8 }}>
              <strong>{c.email || c.mobile_number || 'Guest'}</strong> — <span className={`badge badge-${c.status === 'in_progress' ? 'progress' : c.status}`}>{c.status}</span>
            </div>
          )) : <p className="text-muted mb-0">No contact requests yet.</p>}
        </div>
      </div>
    </div>
  );
}
