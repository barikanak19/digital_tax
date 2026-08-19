import React, { useEffect, useState } from 'react';
import { fetchLoginActivity } from '../services/adminService';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function LoginActivity() {
  const [activity, setActivity] = useState([]);
  const [status, setStatus] = useState('loading');

  const load = () => {
    setStatus('loading');
    fetchLoginActivity().then((res) => { setActivity(res.data.activity); setStatus('success'); }).catch(() => setStatus('error'));
  };
  useEffect(load, []);

  if (status === 'loading') return <LoadingState label="Loading login activity..." />;
  if (status === 'error') return <ErrorState onRetry={load} />;

  return (
    <div>
      <h1>Login Activity</h1>
      <div className="card mt-4" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--color-border)' }}>
              <th style={{ padding: '10px 8px' }}>User Name</th>
              <th style={{ padding: '10px 8px' }}>Email</th>
              <th style={{ padding: '10px 8px' }}>Login Date</th>
              <th style={{ padding: '10px 8px' }}>Login Time</th>
              <th style={{ padding: '10px 8px' }}>Device / Browser</th>
            </tr>
          </thead>
          <tbody>
            {activity.map((a) => {
              const dt = new Date(a.login_at);
              return (
                <tr key={a.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '10px 8px' }}>{a.user_name}</td>
                  <td style={{ padding: '10px 8px' }}>{a.user_email}</td>
                  <td style={{ padding: '10px 8px' }}>{dt.toLocaleDateString()}</td>
                  <td style={{ padding: '10px 8px' }}>{dt.toLocaleTimeString()}</td>
                  <td style={{ padding: '10px 8px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{a.user_agent || '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
